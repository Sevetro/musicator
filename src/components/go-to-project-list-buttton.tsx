import Link from "next/link";

import { projectsPageUrl } from "@/constants/routes";

export default function GoToProjectList() {
  return (
    <Link href={projectsPageUrl} className="btn btn-primary">
      Go to projects
    </Link>
  );
}
