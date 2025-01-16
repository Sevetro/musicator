export interface MusicatorApiErrorResponse {
  errors: string[];
}
export function isMusicatorApiErrorResponse(
  response: unknown,
): response is MusicatorApiErrorResponse {
  return response != null && Object.hasOwn(response, "errors");
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
