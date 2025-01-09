"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button, FormField, Text } from "@/core-components";
import {
  generateRegisterFormData,
  RegisterFormSchema,
} from "./register-form.data";
import {
  emailOccupiedErrorCode,
  usernameOccupiedErrorCode,
} from "@/shared/error-codes";
import { useRegisterUser } from "../../_data/register-user";
import { apiErrorMessages } from "@/utils/error-messages";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
    setError,
  } = useForm<RegisterFormSchema>({ mode: "onBlur" });
  const registerUserMutation = useRegisterUser();

  const password = watch("password");
  const registerFormData = generateRegisterFormData(password);

  const onSubmit: SubmitHandler<RegisterFormSchema> = ({
    username,
    email,
    password,
  }) => {
    const userData = {
      username,
      email,
      password,
    };

    registerUserMutation.mutate(userData, {
      onError: (error) => {
        const isUsernameOccupied = error?.cause.includes(
          usernameOccupiedErrorCode,
        );
        const isEmailOccupied = error?.cause.includes(emailOccupiedErrorCode);
        if (isUsernameOccupied) {
          setError("username", {
            type: "manual",
            message: apiErrorMessages[usernameOccupiedErrorCode],
          });
        }
        if (isEmailOccupied) {
          setError("email", {
            type: "manual",
            message: apiErrorMessages[emailOccupiedErrorCode],
          });
        }
      },
    });
  };

  return (
    <form
      className="flex w-full flex-col items-center gap-5 px-5 py-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {registerFormData.map((formFieldData) => {
        const { name, label, type, registerOptions } = formFieldData;
        return (
          <FormField
            key={name}
            name={name}
            label={label}
            type={type}
            register={register}
            registerOptions={registerOptions}
            errorMessage={formErrors[name]?.message}
          />
        );
      })}

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
