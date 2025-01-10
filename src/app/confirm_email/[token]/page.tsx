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
  "use server"; //TODO: use both?
  let res: Response;

  try {
    res = await fetch(`${confirmEmailApiUrl}/${token}`, {
      method: "GET",
    });
  } catch (err) {
    throw new Error(cantReachApiErrorCode);
  }

  if (!res.ok) await throwApiError(res);
}

export default async function ConfirmEmailPage({
  params: { token },
}: PageProps) {
  "use server"; //TODO: use both?

  try {
    await validateEmailToken(token);
  } catch (err) {
    console.error("Error in validateEmail", err);
    return <div>Invalid or expired confirmation link FE APP.</div>; //TODO: change it
  }
  redirect("/confirmation_success");
}
