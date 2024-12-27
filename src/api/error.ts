export interface MusicatorApiErrorResponse {
  errors: string[];
}

export interface MusicatorApiError extends Error {
  cause: string[];
}
