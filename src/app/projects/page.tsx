"use client";

import { localStorageProjectsKey } from "@/constants/localStorageKeys";

export default function ProjectsListPage() {
  const projects = localStorage.getItem(localStorageProjectsKey);
  return (
    <div>
      <ul className="menu">
        <li>1</li>
        <li>2</li>
      </ul>
    </div>
  );
}
