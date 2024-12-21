import { tv } from "tailwind-variants";

export const buttonVariants = tv({
  base: "btn",
  variants: {
    style: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      danger: "btn-error",
    },
  },
});
