import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { RegisterUserData } from "@/shared/entities/user";
import { registerUserApiUrl } from "@/api/api-urls";
import { customFetch } from "@/utils/custom-fetch";
import { isMusicatorApiError } from "@/api/error";
import { cantCreatePendingUserErrorCode } from "@/shared/error-codes";
import { ERROR_MESSAGES } from "@/utils/error-messages";

async function registerUser(body: RegisterUserData) {
  await customFetch(registerUserApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export const useRegisterUser = () =>
  useMutation<void, Error, RegisterUserData>({
    mutationFn: registerUser,
    mutationKey: ["register"],
    onError: (err) => {
      if (isMusicatorApiError(err)) {
        const cantCreatePendinguser = err.cause.errors.includes(
          cantCreatePendingUserErrorCode,
        );
        if (cantCreatePendinguser) {
          toast.error(ERROR_MESSAGES.cantCreatePendingUser);
        }
      }
    },
  });
