import {
  emailOccupiedErrorCode,
  usernameOccupiedErrorCode,
} from "@/shared/error-codes";

export const apiErrorMessages = {
  [usernameOccupiedErrorCode]: "This username is already in use",
  [emailOccupiedErrorCode]: "This email is already in use",
} as const;
