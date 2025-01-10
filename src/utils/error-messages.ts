import {
  emailOccupiedErrorCode,
  invalidCredentialsErrorCode,
  usernameOccupiedErrorCode,
  userNotFoundErrorCode,
} from "@/shared/error-codes";

export const apiErrorMessages = {
  [usernameOccupiedErrorCode]: "This username is already in use",
  [emailOccupiedErrorCode]: "This email is already in use",
  [userNotFoundErrorCode]: "User not found",
  [invalidCredentialsErrorCode]: "Invalid credentials",
} as const;
