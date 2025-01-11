import { confirmEmailApiUrl } from "@/api/api-urls";
import { cantReachApiErrorCode } from "@/shared/error-codes";
import { throwApiError } from "@/utils/throw-api-error";
import { redirect } from "next/navigation";

import https from "https";
import axios from "axios";

interface Props {
  params: {
    token: string;
  };
}

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export async function GET(req: Request, { params: { token } }: Props) {
  try {
    const res = await axios.get(`${confirmEmailApiUrl}/${token}`, {
      httpsAgent,
    });
    console.log(res);
  } catch (err) {
    console.error(err);
    throw new Error(cantReachApiErrorCode, { cause: err });
  }

  // if (!res.ok) await throwApiError(res);

  redirect("/confirmation_success");
}
