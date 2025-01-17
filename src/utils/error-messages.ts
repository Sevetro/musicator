import {
  cantCreatePendingUserErrorCode,
  cantParseApiResponseErrorCode,
  cantReachApiErrorCode,
  cantSendConfirmationErrorCode,
  emailOccupiedErrorCode,
  expiredTokenErrorCode,
  invalidCredentialsErrorCode,
  invalidOrExpiredTokenErrorCode,
  unknownErrorErrorCode,
  usernameOccupiedErrorCode,
  userNotFoundErrorCode,
} from "@/shared/error-codes";

export const ERROR_MESSAGES = {
  [usernameOccupiedErrorCode]: "This username is already in use",
  [emailOccupiedErrorCode]: "This email is already in use",
  [cantSendConfirmationErrorCode]: "Couldn't send confirmation to this email",
  [userNotFoundErrorCode]: "User not found",
  [invalidCredentialsErrorCode]: "Invalid credentials",
  [cantCreatePendingUserErrorCode]:
    "Couldn't create this user, please contact the administrator.",
  [cantReachApiErrorCode]:
    "The API server is currently offline, please contact the administrator.",
  [cantParseApiResponseErrorCode]:
    "Invalid API server response, please contact the administrator.",
  [unknownErrorErrorCode]:
    "Unknown error has occured, please contact the administrator.",
  [invalidOrExpiredTokenErrorCode]: "Invalid or expired token.",
  [expiredTokenErrorCode]: "Token expired.",
} as const;
