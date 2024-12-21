import { PropsWithChildren } from "react";

import { ButtonStyle } from "./button.types";
import { twMerge } from "tailwind-merge";

interface Props extends PropsWithChildren {
  style: ButtonStyle;
}

export const Button = ({ style, children }: Props) => {
  return <button className={twMerge("btn")}>{children}</button>;
};
