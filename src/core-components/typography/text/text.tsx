import { PropsWithChildren } from "react";

import { TextColor, TextSize, TextWeight } from "./text.types";
import { textVariants } from "./text.styles";

interface Props extends PropsWithChildren {
  size?: TextSize;
  color?: TextColor;
  weight?: TextWeight;
}

export const Text = ({
  size = "md",
  color = "dark",
  weight = "fat",
  children,
}: Props) => {
  const textStyle = textVariants({ size, color, weight });

  return <p className={textStyle}>{children}</p>;
};
