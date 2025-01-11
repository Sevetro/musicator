import { confirmEmailApiUrl } from "@/api/api-urls";
import { cantReachApiErrorCode } from "@/shared/error-codes";
import { throwApiError } from "@/utils/throw-api-error";
import { redirect } from "next/navigation";

import https from "https";
import fs from "fs";

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

    const agent = new https.Agent({
      ca: fs.readFileSync("./certs/server.crt"),
    });

    res = await fetch(`${confirmEmailApiUrl}/${token}`, {
      credentials: "include",
    });
    console.log(`validateEmail response: `, res);
  } catch (err) {
    throw new Error(cantReachApiErrorCode, { cause: err });
  }

  if (!res.ok) await throwApiError(res);

  redirect("/confirmation_success");
}
