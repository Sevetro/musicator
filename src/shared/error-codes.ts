export const nameOccupiedErrorCode = "nameOccupied";
export const emailOccupiedErrorCode = "emailOccupied";

export const apiErrorMessages = {
  [nameOccupiedErrorCode]: "This name is already in use",
  [emailOccupiedErrorCode]: "This email is already in use",
} as const;
