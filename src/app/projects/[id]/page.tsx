"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useContext, useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { Metronome } from "./_components/metronome";
import { BoardSelectionManager } from "./_components/board-selection-manager/board-selection-manager";
import { SoundPicker } from "./_components/sound-picker";
import ActiveTileManager from "./_components/active-tile-manager";
import { SoundBoard } from "./_components/sound-board/sound-board";
import GoToProjectList from "@/_components/go-to-project-list-buttton";
import { Project, ProjectMetadata } from "../_models/project";
import {
  SoundBoardsContext,
  SoundBoardsContextProvider,
} from "./_context/sound-boards-context";
import {
  MetronomeContext,
  MetronomeContextProvider,
} from "./_context/metronome-context";

interface PageProps {
  params: {
    id: string;
  };
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
  const [projectMetaData, setProjectMetaData] = useState<ProjectMetadata>();
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
