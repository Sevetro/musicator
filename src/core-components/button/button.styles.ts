import { tv } from "tailwind-variants";

export const buttonVariants = tv({
  base: "btn",
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      danger: "btn-error",
      neutral: "btn-neutral",
    },
  },
});
