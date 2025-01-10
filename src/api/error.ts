export interface MusicatorApiErrorResponse {
  errors: string[];
}

export interface MusicatorApiError extends Error {
  cause: {
    errors: string[];
    isMusicatorApiError: true;
  };
}

export function isMusicatorApiError(error: Error): error is MusicatorApiError {
  return (
    error.cause != null && Object.hasOwn(error.cause, "isMusicatorApiError")
  );
}
