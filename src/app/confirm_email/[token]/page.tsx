import { redirect } from "next/navigation";

import { confirmEmailApiUrl } from "@/api/api-urls";
import { customFetch } from "@/utils/custom-fetch";
import ConfirmationFailedPage from "./_components/confirmation-failure-page/confirmation-failed-page";
import { isMusicatorApiError } from "@/api/error";

interface Props {
  params: {
    token: string;
  };
}

export default async function ConfirmEmailPage({ params: { token } }: Props) {
  try {
    await customFetch(`${confirmEmailApiUrl}/${token}`);
  } catch (err: any) {
    return (
      <ConfirmationFailedPage
        failureReason={
          isMusicatorApiError(err) ? err.cause.errors[0] : err.message
        }
      />
    );
  }

  redirect("/confirmation_success");
}
