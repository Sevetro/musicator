import { forwardRef, HTMLInputTypeAttribute, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends PropsWithChildren {
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
  id?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, fullWidth, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={twMerge("input", fullWidth && "w-full")}
        {...props}
      >
        {children}
      </input>
    );
  },
);

Input.displayName = "Input";
