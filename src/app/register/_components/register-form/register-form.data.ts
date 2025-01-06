import { FormFieldData } from "@/core-components";
import { RegisterUserData } from "@/shared/entities/user";

export interface RegisterFormSchema extends RegisterUserData {
  confirmPassword: string;
}

import {
  maxEmailLength,
  maxUsernameLength,
  maxPasswordLength,
  minUsernameLength,
  minPasswordLength,
} from "@/shared/validation";

export function generateRegisterFormData(
  password: string,
): FormFieldData<RegisterFormSchema>[] {
  return [
    {
      name: "username",
      registerOptions: {
        required: "Username is required",
        minLength: {
          value: minUsernameLength,
          message: `Username must be at least ${minUsernameLength} characters long`,
        },
        maxLength: {
          value: maxUsernameLength,
          message: `Username can't be longer than ${maxUsernameLength} characters`,
        },
      },
    },
    {
      name: "email",
      registerOptions: {
        required: "Email is required",
        maxLength: {
          value: maxEmailLength,
          message: `Email can't be longer than ${maxEmailLength} characters`,
        },
      },
    },
    {
      name: "password",
      type: "password",
      registerOptions: {
        required: "Password is required",
        minLength: {
          value: minPasswordLength,
          message: `Password must be at least ${minPasswordLength} characters long`,
        },
        maxLength: {
          value: maxPasswordLength,
          message: `Password can't be longer than ${maxPasswordLength} characters`,
        },
      },
    },
    {
      name: "confirmPassword",
      label: "Confirm password",
      type: "password",
      registerOptions: {
        validate: (value: string) =>
          value === password || "Passwords do not match",
      },
    },
  ];
}
