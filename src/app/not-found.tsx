import { GoToMainPage } from "./_components/go-to-main-page-button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      Not found
      <GoToMainPage />
    </div>
  );
}
