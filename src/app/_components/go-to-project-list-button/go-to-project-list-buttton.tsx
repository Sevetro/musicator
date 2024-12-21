import Link from "next/link";

import { projectsPageUrl } from "../../_constants/routes";

export const GoToProjectList = () => {
  return (
    <Link href={projectsPageUrl} className="btn btn-primary">
      Go to projects
    </Link>
  );
};
