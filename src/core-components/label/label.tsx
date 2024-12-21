import { PropsWithChildren } from "react";
import { LabelColor } from "./label.types";
import { labelVariants } from "./label.styles";

interface Props extends PropsWithChildren {
  color?: LabelColor;
  htmlFor: string;
}

export const Label = ({ color = "dark", children, ...props }: Props) => {
  const labelStyle = labelVariants({ color });

  return (
    <label className={labelStyle} {...props}>
      {children}
    </label>
  );
};
