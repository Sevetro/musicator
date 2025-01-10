import { redirect } from "next/navigation";

import { throwApiError } from "@/utils/throw-api-error";
import { confirmEmailApiUrl } from "@/api/api-urls";

interface PageProps {
  params: {
    token: string;
  };
}

export default async function ConfirmEmailPage({
  params: { token },
}: PageProps) {
  async function validateEmailToken(token: string) {
    "use server";

    const res = await fetch(`${confirmEmailApiUrl}/${token}`, {
      method: "GET",
    });

    if (!res.ok) {
      throwApiError(res);
    }
  }

  try {
    await validateEmailToken(token);
  } catch (err) {
    console.error("Error in validateEmail", err);
    return <div>Invalid or expired confirmation link FE APP.</div>; //TODO: change it
  }
  redirect("/confirmation_success");
}
