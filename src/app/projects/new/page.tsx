"use client";

import GoToProjectList from "@/components/go-to-project-list-buttton";

import { ChangeEvent, useState } from "react";

export default function NewProjectPage() {
  const [error, setError] = useState<string>();
  const [title, setTitle] = useState("New project");

  function getNewProjectId() {
    const ids = Object.keys(localStorage).filter((id) => /project\d+/.test(id));
    for (let i = 0; i <= ids.length; i++) {
      if (!ids.includes(`project${i}`)) {
        return `project${i}`;
      }
    }
    return ""; // just to shut up typescript (this function will always return some id)
  }

  function saveProject() {
    const id = getNewProjectId();
    const createdAt = new Date().toLocaleString();
    const project = JSON.stringify({ title, createdAt });
    localStorage.setItem(id, project);
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
          <div className="w-[400px] p-1 mt-1 text-sm alert alert-error absolute">
            {error}
          </div>
        )}
        <button
          disabled={!!error}
          onClick={saveProject}
          className="btn btn-primary"
        >
          Save
        </button>
      </div>
      <GoToProjectList />
    </main>
  );
}
