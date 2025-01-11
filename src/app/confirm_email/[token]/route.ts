import { confirmEmailApiUrl } from "@/api/api-urls";
import { cantReachApiErrorCode } from "@/shared/error-codes";
import { throwApiError } from "@/utils/throw-api-error";
import { redirect } from "next/navigation";

import https from "https";
import axios, { AxiosError, isAxiosError } from "axios";

interface Props {
  params: {
    token: string;
  };
}

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export async function GET(req: Request, { params: { token } }: Props) {
  // try {
  //   const res = await axios.get(`${confirmEmailApiUrl}/${token}`, {
  //     httpsAgent,
  //   });
  //   console.log(res);
  // } catch (err) {
  //   console.error(err);
  //   // throw new Error(cantReachApiErrorCode, { cause: err });
  //   redirect("/register");
  // }

  try {
    const res = await axios.get(`${confirmEmailApiUrl}/${token}`, {
      httpsAgent,
    });

    console.log(res);
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response) {
        // The request was made, and the server responded with a status code
        // that falls outside the range of 2xx
        console.log(`Error response data: `, err.response.data);
        console.log(`Error status: `, err.response.status);
        console.log(`Error headers: `, err.response.headers);
      } else if (err.request) {
        // The request was made, but no response was received
        console.log(`No response received: `, err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log(`Error message: `, err.message);
      }
    }
  }

  // redirect("/register");

  // redirect("/confirmation_success");
}
