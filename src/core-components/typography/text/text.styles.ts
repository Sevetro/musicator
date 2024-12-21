import { tv } from "tailwind-variants";

export const textVariants = tv({
  variants: {
    color: {
      light: "text-white",
      dark: "text-black",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      fat: "font-medium",
      fatter: "font-semibold",
      feminist: "font-bold",
    },
    size: {
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
});
