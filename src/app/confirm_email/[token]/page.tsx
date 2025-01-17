import { redirect } from "next/navigation";

import { confirmEmailApiUrl } from "@/api/api-urls";
import { customFetch } from "@/utils/custom-fetch";
import ConfirmationFailedPage from "./_components/confirmation-failure-page/confirmation-failed-page";
import { isNativeError } from "@/lib/types";
import { ERROR_MESSAGES } from "@/utils/error-messages";

interface Props {
  params: {
    token: string;
  };
}

export default async function ConfirmEmailPage({ params: { token } }: Props) {
  try {
    await customFetch(`${confirmEmailApiUrl}/${token}`);
  } catch (err) {
    const failureReason = isNativeError(err)
      ? ERROR_MESSAGES[err.message as keyof typeof ERROR_MESSAGES]
      : ERROR_MESSAGES.unknownError;

    return <ConfirmationFailedPage failureReason={failureReason} />;
  }

  redirect("/confirmation_success");
}
