import { HTMLAttributes } from "react";

import { ButtonVariant } from "./button.types";
import { buttonVariants } from "./button.styles";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
}

export const Button = ({ variant, ...props }: Props) => {
  const buttonStyle = buttonVariants({ variant });

  return <button className={buttonStyle} {...props} />;
};
