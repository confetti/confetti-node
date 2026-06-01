import Confetti from '../../index.js'

export class UsageError extends Error {}

const METHOD_NAMES = ['findAll', 'find', 'create', 'update', 'delete']

// A resource is any instance property that exposes `find` or `findAll`. This
// excludes the private `adapter` and anything else that isn't a resource, and
// stays correct automatically as the SDK adds or removes resources.
function isResource(value: unknown): value is object {
  if (typeof value !== 'object' || value === null) return false
  return typeof Reflect.get(value, 'find') === 'function' || typeof Reflect.get(value, 'findAll') === 'function'
}

export function listResources(client: Confetti): string[] {
  return Object.keys(client)
    .filter((key) => isResource(Reflect.get(client, key)))
    .sort()
}

function getResource(client: Confetti, name: string): object | undefined {
  const value: unknown = Reflect.get(client, name)
  return isResource(value) ? value : undefined
}

function listMethods(resource: object): string[] {
  return METHOD_NAMES.filter((method) => typeof Reflect.get(resource, method) === 'function')
}

function buildArgs(method: string, id: string | undefined, body: unknown, options: unknown): unknown[] {
  switch (method) {
    case 'findAll':
      return [options]
    case 'find':
    case 'delete':
      if (!id) throw new UsageError(`'${method}' requires an <id>`)
      return [id, options]
    case 'create':
      return [body ?? {}, options]
    case 'update':
      if (!id) throw new UsageError(`'update' requires an <id>`)
      return [id, body ?? {}, options]
    default:
      return [options]
  }
}

export interface DispatchOptions {
  client: Confetti
  resource: string
  method: string
  id?: string
  body?: unknown
  options: unknown
}

export async function dispatch(opts: DispatchOptions): Promise<unknown> {
  const resource = getResource(opts.client, opts.resource)
  if (!resource) {
    throw new UsageError(`Unknown resource '${opts.resource}'. Available: ${listResources(opts.client).join(', ')}`)
  }

  const fn: unknown = Reflect.get(resource, opts.method)
  if (typeof fn !== 'function') {
    throw new UsageError(
      `Resource '${opts.resource}' has no method '${opts.method}'. Available: ${listMethods(resource).join(', ')}`,
    )
  }

  const args = buildArgs(opts.method, opts.id, opts.body, opts.options)
  const result: unknown = await fn(...args)
  return result
}
