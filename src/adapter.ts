import url from 'url'
import qs from 'qs'
import { ParameterError, NotFoundError } from './errors.js'
import yayson from 'yayson'
import presenters from './presenters/index.js'
import { ConfettiModel, ApiError } from './types/index.js'
import nodeFetch from 'node-fetch'

interface HttpOptions {
  method?: string
  headers?: Record<string, string>
  body?: string
  timeout?: number
}

const { Store } = yayson()
const store = new Store()

export interface AdapterOptions {
  apiKey?: string
  apiHost?: string
  apiProtocol?: string
}

export interface FilterOptions {
  [key: string]: string | number | boolean | string[] | number[] | Date
}

export interface PageOptions {
  number?: number
  size?: number
  offset?: number
  limit?: number
}

export interface HttpRequestOptions<T = ConfettiModel> {
  path: string
  json?: T | T[]
  filter?: FilterOptions
  include?: string | string[]
  sort?: string
  page?: PageOptions
  raw?: boolean
  type?: string
  apiKey?: string
  apiHost?: string
  apiProtocol?: string
}

export interface Adapter {
  put<T = ConfettiModel>(options: HttpRequestOptions<T>): Promise<T>
  post<T = ConfettiModel>(options: HttpRequestOptions<T>): Promise<T>
  get<T = ConfettiModel>(options: HttpRequestOptions<T>): Promise<T>
  delete<T = ConfettiModel>(options: HttpRequestOptions<T>): Promise<T>
}

export default function ({ apiKey, apiHost, apiProtocol }: AdapterOptions = {}): Adapter {
  const httpRequest = async function <T = ConfettiModel>(method: string, options: HttpRequestOptions<T>): Promise<T> {
    const { path, json, filter, include, sort, page, raw, type } = options

    const API_HOST = options.apiHost || apiHost || process.env['CONFETTI_API_HOST'] || 'api.confetti.events'

    const API_PROTOCOL = options.apiProtocol || apiProtocol || process.env['CONFETTI_API_PROTOCOL'] || 'https'

    const API_KEY = options.apiKey || apiKey
    const fetchLib = nodeFetch

    if (!API_KEY) {
      throw new Error('missing_api_key')
    }
    let processedInclude = include
    if (Array.isArray(processedInclude)) {
      processedInclude = encodeURI(processedInclude.join(','))
    }

    const httpOptions: HttpOptions = {
      method,
      timeout: method === 'get' ? 5000 : 15000,
      headers: {
        Authorization: `apikey ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip',
      },
    }
    const fetchUrl = url.format({
      host: API_HOST,
      protocol: API_PROTOCOL,
      pathname: path,
      search: qs.stringify({ filter, sort, page, include: processedInclude }),
    })
    if (json) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const presented = presenters[type as keyof typeof presenters].render(json) as {
        data?: {
          attributes?: {
            meta?: unknown
          }
          meta?: unknown
        }
      }

      const meta = presented?.data?.attributes?.meta
      if (meta) {
        presented.data!.meta = meta
        delete presented.data!.attributes!.meta
      }

      httpOptions.body = JSON.stringify(presented)
    }

    const res = await fetchLib!(fetchUrl, httpOptions)

    if (res.status >= 200 && res.status < 299) {
      const contentType = res.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        const body = await res.json()
        if (raw) {
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          return body as T
        } else {
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          return store.sync(body) as T
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return (await res.text()) as T
      }
    } else {
      let errorBody
      if (res.status >= 400 && res.status < 499) {
        const contentType = res.headers.get('content-type') || ''
        if (contentType.includes('application/json')) {
          errorBody = await res.json()
        } else {
          errorBody = await res.text()
        }
      }
      if (res.status == 400) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const error = new ParameterError('validation', errorBody as Record<string, unknown>)
        throw error
      } else if (res.status == 404) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const errorMessage = (errorBody as ApiError)?.message || 'object'
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const error = new NotFoundError(errorMessage, errorBody as Record<string, unknown>)
        throw error
      } else {
        throw new Error()
      }
    }
  }

  const adapter: Adapter = {
    async put<T = ConfettiModel>(options: HttpRequestOptions<T>) {
      return await httpRequest<T>('put', options)
    },

    async post<T = ConfettiModel>(options: HttpRequestOptions<T>) {
      return await httpRequest<T>('post', options)
    },

    async get<T = ConfettiModel>(options: HttpRequestOptions<T>) {
      return await httpRequest<T>('get', options)
    },

    async delete<T = ConfettiModel>(options: HttpRequestOptions<T>) {
      return await httpRequest<T>('delete', options)
    },
  }

  return adapter
}
