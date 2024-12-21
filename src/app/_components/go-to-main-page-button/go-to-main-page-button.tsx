import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface GoToMainPageButtonProps {
  className?: string;
}

export const GoToMainPage = ({ className }: GoToMainPageButtonProps) => {
  return (
    <Link href="/" className={twMerge("btn btn-primary", className)}>
      Go to main page
    </Link>
  );
};
