import { tv } from "tailwind-variants";

export const headerVariants = tv({
  base: "text-xl font-medium",
  variants: {
    color: {
      light: "text-white",
      dark: "text-black",
    },
  },
});
