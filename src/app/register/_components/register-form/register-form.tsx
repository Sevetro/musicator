"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button, FormField, Text } from "@/core-components";

import {
  generateRegisterFormData,
  RegisterFormSchema,
} from "./register-form.data";
import { registerUser } from "./register-form.mutation";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormSchema>({ mode: "onBlur" });

  const password = watch("password");
  const registerFormData = generateRegisterFormData(password);

  const onSubmit: SubmitHandler<RegisterFormSchema> = (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const reponse = registerUser(userData);
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
            errors={errors[name]}
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
