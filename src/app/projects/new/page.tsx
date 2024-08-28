"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

import GoToProjectList from "@/_components/go-to-project-list-buttton";
import { projectsPageUrl } from "@/_constants/routes";
import { SoundBoardData } from "../_models/sound-board";
import { Project } from "../_models/project";

const newSoundBoardsState: SoundBoardData[] = [
  {
    sounds: [{ duration: 24, note: "" }],
    isActive: true,
    isMuted: false,
  },
];

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
    const project: Project = {
      createdAt,
      title,
      soundBoardsState: newSoundBoardsState,
      bpm: 120,
    };
    localStorage.setItem(`project${id}`, JSON.stringify(project));
    router.push(`${projectsPageUrl}/${id}`);
  }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setTitle(value);
    if (!/\S+/.test(value)) {
      setError("Title cannot be empty nor consists of whitespaces only.");
    } else if (value.length > 50) {
      setError("Too long title.");
    } else {
      setError(undefined);
    }
  }

  return (
    <main className="flex h-screen flex-col items-center justify-evenly">
      <div className="flex">
        <div>
          <input
            value={title}
            onChange={handleTitleChange}
            placeholder="My new project..."
            className="input input-bordered mr-1"
          />
          {error && (
            <div className="alert alert-error absolute mt-1 w-auto py-2 text-sm">
              {error}
            </div>
          )}
        </div>
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
