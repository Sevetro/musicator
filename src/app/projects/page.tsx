"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<Record<string, string>>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      Object.entries(projectsSeed).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
      });

      const state = Object.entries(localStorage).reduce((acc, [key, value]) => {
        acc[key] = JSON.parse(value)["title"];
        return acc;
      }, {} as Record<string, string>);
      setProjects(state);
    }
  }, []);

  const projectList = useMemo(
    () =>
      projects !== undefined &&
      Object.entries(projects).map(([key, title]) => {
        const id = key.at(-1);
        return (
          <li key={id}>
            <Link href={`${projectsPageUrl}/${id}`} className="btn btn-primary">
              {title}
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
