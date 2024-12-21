import { projectsPageUrl } from "@/app/_constants/routes";
import { Link } from "@/core-components";

export const GoToProjectList = () => {
  return <Link href={projectsPageUrl}>Go to projects</Link>;
};
