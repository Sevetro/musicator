import { useMutation } from "@tanstack/react-query";

import { MusicatorApiError } from "@/api/error";
import { throwApiError } from "@/utils/throw-api-error";
import { confirmEmailApiUrl } from "@/api/api-urls";

async function confirmEmail(token: string) {
  const res = await fetch(confirmEmailApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include", //TODO: should be used?

    body: JSON.stringify({ token }),
  });

  if (!res.ok) {
    throwApiError(res);
  }
}

export const useConfirmEmail = () =>
  useMutation<void, MusicatorApiError, string>({
    mutationFn: confirmEmail,
    mutationKey: ["confirmEmail"],
  });
