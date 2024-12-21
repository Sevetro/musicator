import { PropsWithChildren } from "react";

import { TextColor, TextWeight } from "./text.types";
import { textVariants } from "./text.styles";

interface Props extends PropsWithChildren {
  color?: TextColor;
  weight?: TextWeight;
}

export const Text = ({ color = "dark", weight = "fat", children }: Props) => {
  const textStyle = textVariants({ color, weight });

  return <p className={textStyle}>{children}</p>;
};
