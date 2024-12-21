import { Link } from "@/core-components";

interface GoToMainPageButtonProps {
  fullWidth?: boolean;
}

export const GoToMainPage = ({ fullWidth }: GoToMainPageButtonProps) => {
  return (
    <Link href="/" fullWidth={fullWidth}>
      Go to main page
    </Link>
  );
};
