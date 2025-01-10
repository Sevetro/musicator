import { MusicatorApiError, MusicatorApiErrorResponse } from "@/api/error";

export async function throwApiError(response: Response) {
  const parsedResponse = (await response.json()) as MusicatorApiErrorResponse;
  throw new Error(parsedResponse.errors.join(", "), {
    cause: parsedResponse.errors,
  }) as MusicatorApiError;
}
