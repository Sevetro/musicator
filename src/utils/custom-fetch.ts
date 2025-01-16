import toast from "react-hot-toast";

import { isMusicatorApiErrorResponse } from "@/api/error";
import {
  cantParseApiResponseErrorCode,
  cantReachApiErrorCode,
  unknownErrorErrorCode,
} from "@/shared/error-codes";
import { throwMusicatorApiError } from "./throw-api-error";
import { apiErrorMessages } from "./error-messages";

export async function customFetch<T>(
  url: string | URL | globalThis.Request,
  options?: RequestInit,
) {
  let res: Response;
  try {
    res = await fetch(url, options);
  } catch (_) {
    if (typeof window !== "undefined") {
      toast.error(apiErrorMessages.cantReachApi);
    }
    throw new Error(`${cantReachApiErrorCode} ${url}`);
  }

  if (res.ok) {
    try {
      return (await res.json()) as T;
    } catch (err) {
      return; //this means there was only success statusCode without any body
    }
  }

  let parsedErrorRes;
  try {
    parsedErrorRes = await res.json();
  } catch (_) {
    if (typeof window !== "undefined") {
      toast.error(apiErrorMessages.cantParseApiResponse);
    }
    throw new Error(
      `${cantParseApiResponseErrorCode} ${res.url} ${res.status} ${res.statusText}`,
    );
  }

  if (isMusicatorApiErrorResponse(parsedErrorRes)) {
    throwMusicatorApiError(parsedErrorRes);
  } else {
    if (typeof window !== "undefined") {
      toast.error(apiErrorMessages.unknownError);
    }
    throw new Error(unknownErrorErrorCode, { cause: res });
  }
}
