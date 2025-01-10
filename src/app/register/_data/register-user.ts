import { useMutation } from "@tanstack/react-query";

import { RegisterUserData } from "@/shared/entities/user";
import { MusicatorApiError } from "@/api/error";
import { throwApiError } from "@/utils/throw-api-error";
import { registerUserApiUrl } from "@/api/api-urls";

async function registerUser(body: RegisterUserData) {
  const response = await fetch(registerUserApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include", //TODO: should be used?

    body: JSON.stringify(body),
  });

  if (!response.ok) {
    await throwApiError(response);
  }
}

export const useRegisterUser = () =>
  useMutation<void, MusicatorApiError, RegisterUserData>({
    mutationFn: registerUser,
    mutationKey: ["register"],
  });
