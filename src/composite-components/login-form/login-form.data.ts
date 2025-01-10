import { FormFieldData } from "@/core-components";

export interface LoginFormSchema {
  usernameOrEmail: string;
  password: string;
}

export const loginFormData: FormFieldData<LoginFormSchema>[] = [
  {
    name: "usernameOrEmail",
    label: "Username/Email",
    registerOptions: {
      required: "Username is required",
    },
  },
  {
    name: "password",
    type: "password",
    registerOptions: {
      required: "Password is required",
    },
  },
];
