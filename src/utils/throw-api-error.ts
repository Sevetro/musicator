import { MusicatorApiErrorResponse } from "@/api/error";

export function throwMusicatorApiError(apiResponse: MusicatorApiErrorResponse) {
  throw new Error(apiResponse.errors.join(", "), {
    cause: {
      errors: apiResponse.errors,
      isMusicatorApiError: true,
    },
  });
}
