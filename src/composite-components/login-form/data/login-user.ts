import { useMutation } from "@tanstack/react-query";

import { LoginUserData } from "@/shared/entities/user";
import { loginApiUrl } from "@/api/api-urls";
import { customFetch } from "@/utils/custom-fetch";

async function loginUser(body: LoginUserData) {
  await customFetch(loginApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export const useLoginUser = () =>
  useMutation<void, Error, LoginUserData>({
    mutationFn: loginUser,
    mutationKey: ["login"],
  });
