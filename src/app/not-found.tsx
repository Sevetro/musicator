import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      Not found
      <Link href="/" className="btn btn-primary">
        Go to main page
      </Link>
    </div>
  );
}
