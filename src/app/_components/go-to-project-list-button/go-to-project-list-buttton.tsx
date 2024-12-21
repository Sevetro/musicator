import { Link } from "@/core-components/link";
import { projectsPageUrl } from "../../_constants/routes";

export const GoToProjectList = () => {
  return <Link href={projectsPageUrl}>Go to projects</Link>;
};
