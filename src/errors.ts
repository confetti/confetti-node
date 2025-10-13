import { inherits } from 'util'

interface ErrorOptions {
  [key: string]: unknown
}

class CustomError extends Error {
  public errorType: string
  public name: string

  constructor(type: string, options: ErrorOptions = {}) {
    super()
    this.name = this.constructor.name
    this.message = type
    this.errorType = type
    Error.captureStackTrace(this, this.constructor)
    Object.assign(this, options)
  }
}

const customError = function (name: string) {
  const error = function (type: string, options: ErrorOptions = {}) {
    return new CustomError(type, options)
  }
  inherits(error, Error)
  error.prototype.name = name
  return error
}

export const UnauthorizedError = customError('UnauthorizedError')
export const ParameterError = customError('ParameterError')
export const NotFoundError = customError('NotFoundError')

export default {
  UnauthorizedError,
  ParameterError,
  NotFoundError,
}
