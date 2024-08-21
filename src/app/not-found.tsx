import GoToMainPage from "@/components/go-to-main-page-button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      Not found
      <GoToMainPage />
    </div>
  );
}
