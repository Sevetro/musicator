import { redirect } from "next/navigation";

import { throwApiError } from "@/utils/throw-api-error";
import { confirmEmailApiUrl } from "@/api/api-urls";
import { cantReachApiErrorCode } from "@/shared/error-codes";

interface PageProps {
  params: {
    token: string;
  };
}

async function validateEmailToken(token: string) {
  console.log(`inside validateEmailToken function`);

  console.log("before use server inside validateEmailToken function");
  ("use server"); //TODO: use both?
  console.log("after use server inside validateEmailToken function");

  let res: Response;

  try {
    console.log(`confirmEmailApiUrl: `, confirmEmailApiUrl);
    console.log(`token: `, token);

    res = await fetch(`${confirmEmailApiUrl}/${token}`, {
      method: "GET",
    });
    console.log(`validateEmail response: `, res);
  } catch (err) {
    throw new Error(cantReachApiErrorCode);
  }

  if (!res.ok) await throwApiError(res);
}

export default async function ConfirmEmailPage({
  params: { token },
}: PageProps) {
  console.log("before use server");
  ("use server"); //TODO: use both?
  console.log("after use server");

  try {
    console.log(`before validate email`);
    await validateEmailToken(token);
    console.log(`after validate email`);
  } catch (err) {
    console.error("Error in validateEmail", err);
    return <div>Invalid or expired confirmation link FE APP.</div>; //TODO: change it
  }
  console.log(`before redirect`);
  redirect("/confirmation_success");
}
