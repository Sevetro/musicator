import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

import { ButtonVariant } from "./button.types";
import { buttonVariants } from "./button.styles";

interface Props extends PropsWithChildren {
  variant?: ButtonVariant;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = ({
  variant = "primary",
  type = "button",
  fullWidth,
  loading,
  children,
  ...props
}: Props) => {
  const buttonStyle = buttonVariants({ variant });

  return (
    <button className={twMerge(buttonStyle, fullWidth && "w-full")} {...props}>
      {loading && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
};
