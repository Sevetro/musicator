import { useMutation } from "@tanstack/react-query";

import { LoginUserData } from "@/shared/entities/user";
import { loginApiUrl } from "@/api/api-urls";
import { throwMusicatorApiError } from "@/utils/throw-api-error";
import { cantReachApiErrorCode } from "@/shared/error-codes";

async function loginUser(body: LoginUserData) {
  // let res: Response;
  // try {
  //   res = await fetch(loginApiUrl, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   });
  // } catch (err) {
  //   throw new Error(cantReachApiErrorCode);
  // }
  // if (!res.ok) await throwMusicatorApiError(res);
}

export const useLoginUser = () =>
  useMutation<void, Error, LoginUserData>({
    mutationFn: loginUser,
    mutationKey: ["login"],
  });
