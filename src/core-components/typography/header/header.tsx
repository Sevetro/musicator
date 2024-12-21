import { PropsWithChildren } from "react";

import { HeaderColor } from "./header.types";
import { headerVariants } from "./header.styles";

interface Props extends PropsWithChildren {
  color?: HeaderColor;
}

export const Header = ({ color = "dark", children }: Props) => {
  const headerStyles = headerVariants({ color });

  return <h1 className={headerStyles}>{children}</h1>;
};
