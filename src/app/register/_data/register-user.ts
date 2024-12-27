import { useMutation } from "@tanstack/react-query";

import { registerUserUrl } from "@/api/register-user";
import { RegisterUserData } from "@/shared/entities/user";
import { MusicatorApiError, MusicatorApiErrorResponse } from "@/api/error";
import { parseJSON } from "@/utils/parse-json";

async function registerUser(body: RegisterUserData) {
  const response = await fetch(registerUserUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const parsedResponse = (await parseJSON<RegisterUserData>(
      response,
    )) as MusicatorApiErrorResponse;
    throw new Error(parsedResponse.errors.join(", "), {
      cause: parsedResponse.errors,
    }) as MusicatorApiError;
  }
}

export const useRegisterUser = () =>
  useMutation<void, MusicatorApiError, RegisterUserData>({
    mutationFn: registerUser,
    mutationKey: ["register"],
  });
