import toast from "react-hot-toast";

import { isMusicatorApiErrorResponse } from "@/api/error";
import { throwMusicatorApiError } from "./throw-api-error";
import { ERROR_MESSAGES } from "./error-messages";

export async function customFetch<T>(
  url: string | URL | globalThis.Request,
  options?: RequestInit,
) {
  let res: Response;
  try {
    res = await fetch(url, options);
  } catch (_) {
    if (typeof window !== "undefined") {
      toast.error(ERROR_MESSAGES.cantReachApi);
    }
    throw new Error(ERROR_MESSAGES.cantReachApi, {
      cause: {
        url,
      },
    });
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
      toast.error(ERROR_MESSAGES.cantParseApiResponse);
    }
    const { url, status, statusText } = res;
    throw new Error(ERROR_MESSAGES.cantParseApiResponse, {
      cause: {
        url,
        status,
        statusText,
      },
    });
  }

  if (isMusicatorApiErrorResponse(parsedErrorRes)) {
    throwMusicatorApiError(parsedErrorRes);
  } else {
    if (typeof window !== "undefined") {
      toast.error(ERROR_MESSAGES.unknownError);
    }
    throw new Error(ERROR_MESSAGES.unknownError, { cause: { res } });
  }
}
