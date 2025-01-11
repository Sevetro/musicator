import { confirmEmailApiUrl } from "@/api/api-urls";
import { cantReachApiErrorCode } from "@/shared/error-codes";
import { throwApiError } from "@/utils/throw-api-error";
import { redirect } from "next/navigation";

import https from "https";
import fs from "fs";
import axios from "axios";

interface Props2 {
  params: Promise<{ token: string }>;
}

interface Props {
  params: {
    token: string;
  };
}

export async function GET(request: Request, { params: { token } }: Props) {
  console.log(`inside validateEmailToken function`);

  let res: Response;

  try {
    console.log(`confirmEmailApiUrl: `, confirmEmailApiUrl);
    console.log(`token: `, token);

    const httpsAgent = new https.Agent({
      cert: fs.readFileSync(process.cwd() + "/cert/server.crt"),
      // rejectUnauthorized: false, // Disable SSL verification
    });

    const res = await axios.get(`${confirmEmailApiUrl}/${token}`, {
      httpsAgent,
    });

    console.log(`validateEmail response: `, res);
  } catch (err) {
    throw new Error(cantReachApiErrorCode, { cause: err });
  }

  // if (!res.ok) await throwApiError(res);

  redirect("/confirmation_success");
}
