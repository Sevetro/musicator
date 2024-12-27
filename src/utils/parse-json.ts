import { MusicatorApiErrorResponse } from "@/api/error";

export async function parseJSON<T>(
  response: Response,
): Promise<T | MusicatorApiErrorResponse> {
  return response.json() as Promise<T>;
}
