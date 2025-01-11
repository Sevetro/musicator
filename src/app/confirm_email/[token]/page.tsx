import { redirect } from "next/navigation";

import { throwApiError } from "@/utils/throw-api-error";
import { confirmEmailApiUrl } from "@/api/api-urls";
import { cantReachApiErrorCode } from "@/shared/error-codes";

interface PageProps {
  params: {
    token: string;
  };
}

// export async function getServerSideProps() {
//   const res = await fetch("http://localhost:3000/api/user?uid=123456");
//   const user = await res.json();
//   return {
//     props: { user },
//   };
// }

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
    throw new Error(cantReachApiErrorCode, { cause: err });
  }

  if (!res.ok) await throwApiError(res);
}

export default async function ConfirmEmailPage({
  params: { token },
}: PageProps) {
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
