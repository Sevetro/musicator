"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { projectsPageUrl } from "../_constants/routes";
import { ProjectMetadata } from "./_models/project";
import { firstTimeFlagKey } from "../_constants/local-storage-keys";
import { projectExample } from "./_constants/project-example";
import { GoToMainPage } from "../_components/go-to-main-page-button";
import { Link } from "@/core-components/link";
import { Button } from "@/core-components/button";

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<Record<string, ProjectMetadata>>();

  const deleteProject = useCallback(
    (id: string) => {
      localStorage.removeItem(id);
      const newProjects = { ...projects };
      delete newProjects[id];
      setProjects(newProjects);
    },
    [projects],
  );

  const projectList = useMemo(
    () =>
      projects !== undefined &&
      Object.entries(projects)
        .sort(
          ([, project1], [, project2]) =>
            Date.parse(project2.createdAt) - Date.parse(project1.createdAt),
        )
        .map(([key, project]) => {
          const id = key.at(-1);
          return (
            <li key={id}>
              <div className="mt-2 flex gap-1">
                <Link
                  href={`${projectsPageUrl}/${id}`}
                  className="w-60 break-all"
                >
                  {project.title}
                </Link>

                <Button variant="danger" onClick={() => deleteProject(key)}>
                  Delete
                </Button>
              </div>
            </li>
          );
        }),
    [deleteProject, projects],
  );

  useEffect(() => {
    const firstTimeFlag = localStorage.getItem(firstTimeFlagKey);
    if (firstTimeFlag === null || firstTimeFlag === "true") {
      localStorage.setItem("project0", JSON.stringify(projectExample));
      localStorage.setItem(firstTimeFlagKey, "false");
    }
  }, []);

  useEffect(() => {
    const projects = Object.entries(localStorage)
      .filter(([key]) => /project\d+/.test(key))
      .reduce(
        (acc, [key, value]) => {
          acc[key] = JSON.parse(value);
          return acc;
        },
        {} as Record<string, ProjectMetadata>,
      );
    setProjects(projects);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul className="">{projectList}</ul>
      <div className="w-44 space-y-2">
        <Link
          className="btn btn-primary w-full"
          href={`${projectsPageUrl}/new`}
        >
          Create new project
        </Link>
        <GoToMainPage fullWidth />
      </div>
    </main>
  );
}
