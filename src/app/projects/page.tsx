"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { projectsPageUrl } from "@/constants/routes";

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<Record<string, string>>();

  const deleteProject = useCallback(
    (id: string) => {
      localStorage.removeItem(id);
      const newProjects = { ...projects };
      delete newProjects[id];
      setProjects(newProjects);
    },
    [projects]
  );

  const projectList = useMemo(
    () =>
      projects !== undefined &&
      Object.entries(projects).map(([id, title]) => {
        const urlId = id.at(-1);
        return (
          <li key={urlId}>
            <div className="flex">
              <Link
                href={`${projectsPageUrl}/${urlId}`}
                className="btn btn-primary"
              >
                {title}
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
    [deleteProject, projects]
  );

  useEffect(() => {
    const projects = Object.entries(localStorage)
      .filter(([key]) => /project\d+/.test(key))
      .reduce((acc, [key, value]) => {
        acc[key] = JSON.parse(value)["title"];
        return acc;
      }, {} as Record<string, string>);
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
