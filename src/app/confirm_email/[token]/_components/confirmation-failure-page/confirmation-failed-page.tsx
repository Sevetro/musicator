import { Header, Text } from "@/core-components";

interface Props {
  failureReason: string;
}

export default function ConfirmationFailedPage({ failureReason }: Props) {
  return (
    <main className="center flex h-full items-center justify-center">
      <div className="flex w-[590px] flex-col items-center gap-1 rounded-xl border bg-slate-900 py-3">
        <Header color="light">Email confirmation failed.</Header>
        <Text color="light">{failureReason}</Text>
      </div>
    </main>
  );
}
