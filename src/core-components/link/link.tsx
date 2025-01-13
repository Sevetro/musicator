import { PropsWithChildren } from "react";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { LinkVariant } from "./link.types";

interface Props extends PropsWithChildren {
  href: Url;
  variant?: LinkVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const CustomLink = ({
  href,
  variant = "button",
  fullWidth = false,
  disabled,
  className,
  children,
}: Props) => {
  return (
    <Link
      href={href}
      className={twMerge(
        variant === "button" && "btn btn-primary",
        fullWidth && "w-full",
        disabled && "btn-disabled",
        className,
      )}
    >
      {children}
    </Link>
  );
};
