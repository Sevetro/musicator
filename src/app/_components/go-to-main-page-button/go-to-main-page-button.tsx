import { Link } from "@/components/link";

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
