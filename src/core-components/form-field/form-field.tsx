import { HTMLInputTypeAttribute } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import { Input, Label } from "..";
import { ErrorMessage } from "./error-message";
import { Capitalize } from "@/lib/capitalize";

export interface FormFieldData<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  type?: HTMLInputTypeAttribute;
  registerOptions?: RegisterOptions<T>;
}

interface Props<T extends FieldValues> extends FormFieldData<T> {
  register: UseFormRegister<T>;
  errors: FieldError | undefined;
}

export const FormField = <T extends FieldValues>({
  name,
  label,
  type,
  register,
  registerOptions,
  errors,
}: Props<T>) => {
  return (
    <div className="relative w-full">
      <Label htmlFor={name}>
        {label === undefined ? Capitalize(name) : label}
      </Label>
      <Input
        fullWidth
        id={name}
        {...register(name, registerOptions)}
        type={type === undefined ? "text" : type}
      />
      {errors && <ErrorMessage>{errors.message}</ErrorMessage>}
    </div>
  );
};
