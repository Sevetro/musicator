export const usernameOccupiedErrorCode = "usernameOccupied";
export const emailOccupiedErrorCode = "emailOccupied";

export const apiErrorMessages = {
  [usernameOccupiedErrorCode]: "This username is already in use",
  [emailOccupiedErrorCode]: "This email is already in use",
} as const;
