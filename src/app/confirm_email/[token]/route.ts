import { confirmEmailApiUrl } from "@/api/api-urls";
import { cantReachApiErrorCode } from "@/shared/error-codes";
import { throwApiError } from "@/utils/throw-api-error";
import { redirect } from "next/navigation";

interface Props {
  params: {
    token: string;
  };
}

export async function GET(req: Request, { params: { token } }: Props) {
  try {
    const res = await fetch(`${confirmEmailApiUrl}/${token}`);
    console.log(res);
  } catch (err) {
    console.error(err);
    // throw new Error(cantReachApiErrorCode, { cause: err });
    redirect("/register");
  }
}
