import { HTMLInputTypeAttribute } from "react";
import {
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
  errorMessage: string | undefined;
}

export const FormField = <T extends FieldValues>({
  name,
  label,
  type,
  register,
  registerOptions,
  errorMessage,
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
      {errorMessage !== undefined && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </div>
  );
};
