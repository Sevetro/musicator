"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { projectsPageUrl } from "@/constants/routes";
import { ProjectMetadata } from "./[id]/models/project";

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
        .map(([id, project]) => {
          const urlId = id.at(-1);
          return (
            <li key={urlId}>
              <div className="flex">
                <Link
                  href={`${projectsPageUrl}/${urlId}`}
                  className="btn btn-primary"
                >
                  {project.title}
                </Link>
                <button
                  className="btn btn-error"
                  onClick={() => deleteProject(id)}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        }),
    [deleteProject, projects],
  );

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
      <Link className="btn btn-primary" href={`${projectsPageUrl}/new`}>
        Create new project
      </Link>
    </main>
  );
}
