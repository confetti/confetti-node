import { inherits } from 'util';
class CustomError extends Error {
    errorType;
    name;
    constructor(type, options = {}) {
        super();
        this.name = this.constructor.name;
        this.message = type;
        this.errorType = type;
        Error.captureStackTrace(this, this.constructor);
        Object.assign(this, options);
    }
}
const customError = function (name) {
    const error = function (type, options = {}) {
        return new CustomError(type, options);
    };
    inherits(error, Error);
    error.prototype.name = name;
    return error;
};
export const UnauthorizedError = customError('UnauthorizedError');
export const ParameterError = customError('ParameterError');
export const NotFoundError = customError('NotFoundError');
export default {
    UnauthorizedError,
    ParameterError,
    NotFoundError,
};
