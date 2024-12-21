"use client";

import {
  maxEmailLength,
  maxNameLength,
  maxPasswordLength,
  minNameLength,
  minPasswordLength,
} from "@/constants/form-validation";
import { Button, Input, Label, Text } from "@/core-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerFormFields } from "./register-form.constants";

const url = "http://localhost:8080";

interface LoginRequestBody {
  username: string;
  password: string;
}

function login(body: any) {
  fetch(url, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // body: JSON.stringify(body),
    body,

    // credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => console.log(`My data from server:`, data))
    .catch((err) => console.log(err));
}

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) =>
    console.log(data);

  const password = watch("password");

  return (
    <form
      className="flex w-full flex-col items-center gap-5 px-5 py-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative w-full">
        <Label htmlFor={registerFormFields.name}>Name</Label>
        <Input
          id={registerFormFields.name}
          fullWidth
          type="text"
          {...register(registerFormFields.name, {
            required: "Name is required",
            minLength: {
              value: minNameLength,
              message: `Name must be at least ${minNameLength} characters long`,
            },
            maxLength: {
              value: maxNameLength,
              message: `Name can't be longer than ${maxNameLength} characters`,
            },
          })}
        />
        {errors.name && (
          <p className="absolute -bottom-5 left-0 text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="relative w-full">
        <Label htmlFor={registerFormFields.email}>Email</Label>
        <Input
          id={registerFormFields.email}
          fullWidth
          type="text"
          {...register(registerFormFields.email, {
            required: "Email is required",
            maxLength: {
              value: maxEmailLength,
              message: `Email can't be longer than ${maxEmailLength} characters`,
            },
          })}
        />
        {errors.email && (
          <p className="absolute -bottom-5 left-0 text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="relative w-full">
        <Label htmlFor={registerFormFields.password}>Password</Label>
        <Input
          id={registerFormFields.password}
          fullWidth
          type="password"
          {...register(registerFormFields.password, {
            required: "Password is required",
            minLength: {
              value: minPasswordLength,
              message: `Password must be at least ${minPasswordLength} characters long`,
            },
            maxLength: {
              value: maxPasswordLength,
              message: `Password can't be longer than ${maxPasswordLength} characters`,
            },
          })}
        />
        {errors.password && (
          <p className="absolute -bottom-5 left-0 text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="relative w-full">
        <Label htmlFor={registerFormFields.confirmPassword}>
          Confirm password
        </Label>
        <Input
          id={registerFormFields.confirmPassword}
          fullWidth
          type="password"
          {...register(registerFormFields.confirmPassword, {
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="absolute -bottom-5 left-0 text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="w-full pt-4">
        <Button fullWidth variant="neutral" type="submit">
          <Text size="lg" color="light">
            Register
          </Text>
        </Button>
      </div>
    </form>
  );
};
