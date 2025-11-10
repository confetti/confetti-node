interface ErrorOptions {
  [key: string]: unknown
}

export class ParameterError extends Error {
  public errorType: string

  constructor(message: string, options: ErrorOptions = {}) {
    super(message)
    this.name = 'ParameterError'
    this.errorType = message
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
    Object.assign(this, options)
  }
}

export class NotFoundError extends Error {
  public errorType: string

  constructor(message: string, options: ErrorOptions = {}) {
    super(message)
    this.name = 'NotFoundError'
    this.errorType = message
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
    Object.assign(this, options)
  }
}

export default {
  ParameterError,
  NotFoundError,
}
