"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button, FormField, Text } from "@/core-components";
import { loginFormData, LoginFormSchema } from "./login-form.data";
import { useLoginUser } from "./data/login-user";
import { isMusicatorApiError } from "@/api/error";
import {
  invalidCredentialsErrorCode,
  userNotFoundErrorCode,
} from "@/shared/error-codes";
import { errorMessages } from "@/utils/error-messages";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setError,
  } = useForm<LoginFormSchema>({ mode: "onBlur" });
  const { mutate: loginUser, isPending: isLoginPending } = useLoginUser();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormSchema> = async (loginData) => {
    await loginUser(loginData, {
      onError: (error) => {
        if (isMusicatorApiError(error)) {
          const { errors } = error.cause;

          const areCredentialsInvalid = errors.includes(
            invalidCredentialsErrorCode,
          );
          if (areCredentialsInvalid) {
            setError("password", {
              type: "manual",
              message: errorMessages[invalidCredentialsErrorCode],
            });
          }

          const userWasntFound = errors.includes(userNotFoundErrorCode);
          if (userWasntFound) {
            setError("usernameOrEmail", {
              type: "manual",
              message: errorMessages[userNotFoundErrorCode],
            });
          }
        }
      },
      onSuccess: () => {
        router.push(`/`);
      },
    });
  };

  return (
    <form
      className="flex w-full flex-col items-center gap-5 px-5 py-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {loginFormData.map((formFieldData) => {
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
        <Button
          loading={isLoginPending}
          fullWidth
          variant="neutral"
          type="submit"
        >
          <Text size="lg" color="light">
            Login
          </Text>
        </Button>
      </div>
    </form>
  );
};
