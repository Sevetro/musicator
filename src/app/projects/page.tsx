"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { localStorageProjectsKey } from "@/constants/local-storage-keys";
import { projectsPageUrl } from "@/constants/routes";

const projectsSeed = {
  project1: {
    title: "Moj pierwszy projekt",
    createdAt: new Date().toLocaleString(),
  },
  project2: {
    title: "Moj drugi projekt",
    createdAt: new Date().toLocaleString(),
  },
};

interface Project {
  title: string;
  createdAt: string;
}

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<Record<string, Project>>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        localStorageProjectsKey,
        JSON.stringify(projectsSeed)
      );
      setProjects(
        JSON.parse(localStorage.getItem(localStorageProjectsKey) ?? "")
      );
    }
  }, []);

  const projectList = useMemo(
    () =>
      projects !== undefined &&
      Object.entries(projects).map(([key, value]) => {
        const id = key.at(-1);
        return (
          <li key={id}>
            <Link href={`${projectsPageUrl}/${id}`} className="btn btn-primary">
              {value.title}
            </Link>
          </li>
        );
      }),
    [projects]
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul className="menu">{projectList}</ul>
    </main>
  );
}
