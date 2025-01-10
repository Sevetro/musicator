import { MusicatorApiErrorResponse } from "@/api/error";
import { cantParseApiResponseErrorCode } from "@/shared/error-codes";

export async function throwApiError(response: Response) {
  let parsedResponse: MusicatorApiErrorResponse;
  try {
    parsedResponse = await response.json();
  } catch (err) {
    throw new Error(cantParseApiResponseErrorCode);
    //TODO: add global error handling for this case (popup, whatever)
  }

  throw new Error(parsedResponse.errors.join(", "), {
    cause: {
      errors: parsedResponse.errors,
      isMusicatorApiError: true,
    },
  });
}
