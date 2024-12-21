import { PropsWithChildren } from "react";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { LinkStyle } from "./link.types";

interface Props extends PropsWithChildren {
  href: Url;
  style?: LinkStyle;
  fullWidth?: boolean;
  className?: string;
}

export const CustomLink = ({
  href,
  style = "button",
  fullWidth = false,
  className,
  children,
}: Props) => {
  return (
    <Link
      href={href}
      className={twMerge(
        style === "button" && "btn btn-primary",
        fullWidth && "w-full",
        className,
      )}
    >
      {children}
    </Link>
  );
};
