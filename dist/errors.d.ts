interface ErrorOptions {
    [key: string]: unknown;
}
declare class CustomError extends Error {
    errorType: string;
    name: string;
    constructor(type: string, options?: ErrorOptions);
}
export declare const UnauthorizedError: (type: string, options?: ErrorOptions) => CustomError;
export declare const ParameterError: (type: string, options?: ErrorOptions) => CustomError;
export declare const NotFoundError: (type: string, options?: ErrorOptions) => CustomError;
declare const _default: {
    UnauthorizedError: (type: string, options?: ErrorOptions) => CustomError;
    ParameterError: (type: string, options?: ErrorOptions) => CustomError;
    NotFoundError: (type: string, options?: ErrorOptions) => CustomError;
};
export default _default;
//# sourceMappingURL=errors.d.ts.map