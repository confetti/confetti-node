// Response types for Confetti API

export interface ApiResponse<T> {
  data: T
  meta?: {
    total?: number
    page?: number
    perPage?: number
    totalPages?: number
  }
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number
    page: number
    perPage: number
    totalPages: number
  }
}

export interface SingleResponse<T> extends ApiResponse<T> {
  data: T
}

// Error response types
export interface ApiError {
  message: string
  code?: string
  details?: Record<string, unknown>
}

export interface ValidationError extends ApiError {
  code: 'validation'
  details: Record<string, string[]>
}

export interface NotFoundError extends ApiError {
  code: 'not_found'
}
