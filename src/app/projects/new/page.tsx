"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import GoToProjectList from "@/components/go-to-project-list-buttton";
import { projectsPageUrl } from "@/constants/routes";

export default function NewProjectPage() {
  const [error, setError] = useState<string>();
  const [title, setTitle] = useState("New project");
  const router = useRouter();

  function getNewProjectId() {
    const ids = Object.keys(localStorage).filter((id) => /project\d+/.test(id));
    for (let i = 0; i <= ids.length; i++) {
      if (!ids.includes(`project${i}`)) {
        return i;
      }
    }
  }

  function createNewProject() {
    const id = getNewProjectId();
    const createdAt = new Date().toLocaleString();
    const soundBoardsState: string[] = [];
    const project = JSON.stringify({ title, createdAt, soundBoardsState });
    localStorage.setItem(`project${id}`, project);
    router.push(`${projectsPageUrl}/${id}`);
  }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setTitle(value);
    if (!/\S+/.test(value)) {
      setError("Title cannot be empty nor consists of whitespaces only");
    } else {
      setError(undefined);
    }
  }

  return (
    <main>
      <div>
        <input
          value={title}
          onChange={handleTitleChange}
          placeholder="My new project..."
          className="input input-bordered w-full max-w-xs"
        />
        {error && (
          <div className="alert alert-error absolute mt-1 w-[400px] p-1 text-sm">
            {error}
          </div>
        )}
        <button
          disabled={!!error}
          onClick={createNewProject}
          className="btn btn-primary"
        >
          Create
        </button>
      </div>
      <GoToProjectList />
    </main>
  );
}
