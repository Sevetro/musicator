import { HTMLAttributes, PropsWithChildren } from "react";

import { ButtonVariant } from "./button.types";
import { buttonVariants } from "./button.styles";

interface Props extends PropsWithChildren {
  variant: ButtonVariant;
  onClick: HTMLAttributes<HTMLButtonElement>["onClick"];
}

export const Button = ({ variant, ...props }: Props) => {
  const buttonStyle = buttonVariants({ variant });

  return <button className={buttonStyle} {...props} />;
};
