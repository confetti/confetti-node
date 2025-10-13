export interface ApiResponse<T> {
    data: T;
    meta?: {
        total?: number;
        page?: number;
        perPage?: number;
        totalPages?: number;
    };
}
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    meta: {
        total: number;
        page: number;
        perPage: number;
        totalPages: number;
    };
}
export interface SingleResponse<T> extends ApiResponse<T> {
    data: T;
}
export interface ApiError {
    message: string;
    code?: string;
    details?: Record<string, unknown>;
}
export interface ValidationError extends ApiError {
    code: 'validation';
    details: Record<string, string[]>;
}
export interface NotFoundError extends ApiError {
    code: 'not_found';
}
export interface UnauthorizedError extends ApiError {
    code: 'unauthorized';
}
//# sourceMappingURL=responses.d.ts.map