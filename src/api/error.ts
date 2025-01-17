import { isNativeError, isSimpleObject } from "@/lib/types";

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
export function isMusicatorApiError(
  error: unknown,
): error is MusicatorApiError {
  return (
    isNativeError(error) &&
    isSimpleObject(error.cause) &&
    Object.hasOwn(error.cause, "isMusicatorApiError")
  );
}
