import { FormFieldData } from "@/core-components";
import { RegisterUserData } from "@/shared/entities/user";

export interface RegisterFormSchema extends RegisterUserData {
  confirmPassword: string;
}

import {
  maxEmailLength,
  maxNameLength,
  maxPasswordLength,
  minNameLength,
  minPasswordLength,
} from "@/shared/validation";

export function generateRegisterFormData(
  password: string,
): FormFieldData<RegisterFormSchema>[] {
  return [
    {
      name: "name",
      registerOptions: {
        required: "Name is required",
        minLength: {
          value: minNameLength,
          message: `Name must be at least ${minNameLength} characters long`,
        },
        maxLength: {
          value: maxNameLength,
          message: `Name can't be longer than ${maxNameLength} characters`,
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
