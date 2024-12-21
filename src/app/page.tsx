import Link from "next/link";
import Image from "next/image";

import { projectsPageUrl } from "./_constants/routes";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-24">
      <Link href={projectsPageUrl} className="btn btn-primary">
        My projects
      </Link>

      {/* <LoginForm />

      <div>
        <RestartModalButton />
        <RestartModal />
      </div> */}
    </main>
  );
}
