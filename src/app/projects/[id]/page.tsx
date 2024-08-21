"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useContext, useEffect, useState } from "react";
import { notFound } from "next/navigation";

import {
  MetronomeContext,
  MetronomeContextProvider,
} from "./context/metronome-context";
import {
  SoundBoardsContext,
  SoundBoardsContextProvider,
} from "./context/sound-boards-context";
import { Metronome } from "./components/metronome";
import { BoardSelectionManager } from "./components/board-selection-manager/board-selection-manager";
import { SoundPicker } from "./components/sound-picker";
import ActiveTileManager from "./components/active-tile-manager";
import { SoundBoard } from "./components/sound-board/sound-board";
import GoToProjectList from "@/components/go-to-project-list-buttton";
import { SoundBoardData } from "./models/sound-board";

interface PageProps {
  params: {
    id: string;
  };
}

interface ProjectMetaData {
  title: string;
  createdAt: string;
}

interface Project extends ProjectMetaData {
  soundBoardsState: SoundBoardData[];
  bpm: number;
}

export default function ProjectPage({ params }: PageProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <MetronomeContextProvider>
        <SoundBoardsContextProvider>
          <ProjectPage2 params={params} />
        </SoundBoardsContextProvider>
      </MetronomeContextProvider>
    </DndProvider>
  );
}

function ProjectPage2({ params }: PageProps) {
  const [projectMetaData, setProjectMetaData] = useState<ProjectMetaData>();
  const { soundBoardsState, setSoundBoardsState } =
    useContext(SoundBoardsContext);
  const { bpm } = useContext(MetronomeContext);

  function save() {
    const newProject: Project = {
      title: projectMetaData?.title as string,
      createdAt: projectMetaData?.createdAt as string,
      soundBoardsState,
      bpm,
    };
    localStorage.setItem(`project${params.id}`, JSON.stringify(newProject));
  }

  useEffect(() => {
    const project: Project = JSON.parse(
      localStorage.getItem(`project${params.id}`) as string,
    );
    if (project == null) notFound();
    setProjectMetaData({ title: project.title, createdAt: project.createdAt });
    setSoundBoardsState(project.soundBoardsState);
  }, [params.id, setSoundBoardsState]);

  return (
    <div className="flex h-screen w-screen bg-cyan-950 p-5">
      <div className="absolute flex">
        <GoToProjectList />
        <button onClick={save} className="btn btn-primary ml-1">
          Save
        </button>
      </div>

      <div className="flex w-3/5 flex-col items-center">
        <Metronome />
        <BoardSelectionManager />

        <div className="divider" />

        {soundBoardsState.map((board, id) => (
          <SoundBoard
            key={id}
            boardId={id}
            active={board.active}
            sounds={board.sounds}
          />
        ))}
      </div>

      <div className="flex w-2/5 flex-col">
        <SoundPicker />
        <div className="divider" />
        <ActiveTileManager />
      </div>
    </div>
  );
}
