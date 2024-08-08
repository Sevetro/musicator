"use client";

import { localStorageProjectsKey } from "@/constants/localStorageKeys";
import { useEffect, useState } from "react";

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<any>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setProjects(localStorage.getItem(localStorageProjectsKey));
    }
  }, []);
  return (
    <div>
      <ul className="menu">
        <li>1</li>
        <li>2</li>
      </ul>
    </div>
  );
}
