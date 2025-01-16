"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button, FormField, Text } from "@/core-components";
import {
  generateRegisterFormData,
  RegisterFormSchema,
} from "./register-form.data";
import {
  cantSendConfirmationErrorCode,
  emailOccupiedErrorCode,
  usernameOccupiedErrorCode,
} from "@/shared/error-codes";
import { useRegisterUser } from "../../_data/register-user";
import { apiErrorMessages } from "@/utils/error-messages";
import { isMusicatorApiError } from "@/api/error";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
    setError,
  } = useForm<RegisterFormSchema>({ mode: "onBlur" });
  const { mutate: registerUser, isPending: isRegisterPending } =
    useRegisterUser();
  const router = useRouter();

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

    registerUser(userData, {
      onError: (err) => {
        if (isMusicatorApiError(err)) {
          const { errors } = err.cause;
          const isUsernameOccupied = errors.includes(usernameOccupiedErrorCode);
          const isEmailOccupied = errors.includes(emailOccupiedErrorCode);
          const cantSendConfirmation = errors.includes(
            cantSendConfirmationErrorCode,
          );
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
          if (cantSendConfirmation) {
            setError("email", {
              type: "manual",
              message: apiErrorMessages[cantSendConfirmationErrorCode],
            });
          }
        }
      },
      onSuccess: (_, { email }) => {
        router.push(`/email_sent/${encodeURIComponent(email)}`);
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
        <Button
          loading={isRegisterPending}
          fullWidth
          variant="neutral"
          type="submit"
        >
          <Text size="lg" color="light">
            Register
          </Text>
        </Button>
      </div>
    </form>
  );
};
