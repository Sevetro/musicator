import { Header, Text } from "@/core-components";

interface PageProps {
  params: {
    email: string;
  };
}

export default function EmailSentPage({ params: { email } }: PageProps) {
  const decodedEmail = decodeURIComponent(email);
  return (
    <main className="center flex h-full items-center justify-center">
      <div className="flex w-[590px] flex-col items-center gap-1 rounded-xl border bg-slate-900 py-3">
        <Header color="light">Email sent!</Header>
        <Text color="light">The verification email has been sent to:</Text>
        <Text color="light">
          <u>{decodedEmail}</u>
        </Text>
        <Text color="light">
          Check your inbox and click the link inside to complete your
          registration.
        </Text>
        <Text weight="light" color="light">
          <i>You can close this page now.</i>
        </Text>
      </div>
    </main>
  );
}
