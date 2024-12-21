import { Link } from "@/core-components";
import { projectsPageUrl } from "./_constants/routes";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-24">
      <Link href={projectsPageUrl}>My projects</Link>

      {/* <LoginForm />

      <div>
        <RestartModalButton />
        <RestartModal />
      </div> */}
    </main>
  );
}
