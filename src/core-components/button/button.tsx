import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

import { ButtonVariant } from "./button.types";
import { buttonVariants } from "./button.styles";

interface Props extends PropsWithChildren {
  variant?: ButtonVariant;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  fullWidth?: boolean;
}

export const Button = ({
  variant = "primary",
  type = "button",
  fullWidth,
  ...props
}: Props) => {
  const buttonStyle = buttonVariants({ variant });

  return (
    <button
      className={twMerge(buttonStyle, fullWidth && "w-full")}
      {...props}
    />
  );
};
