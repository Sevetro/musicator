import { PropsWithChildren } from "react";

export const ErrorMessage = ({ children }: PropsWithChildren) => (
  <p className="absolute -bottom-5 left-0 text-red-500">{children}</p>
);
