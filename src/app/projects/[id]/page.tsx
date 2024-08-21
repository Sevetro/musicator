"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useContext, useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { MetronomeContextProvider } from "./context/metronome-context";
import {
  SoundBoardsContext,
  SoundBoardsContextProvider,
} from "./context/sound-boards-context";
import { Metronome } from "./components/metronome";
import { BoardSelectionManager } from "./components/board-selection-manager/board-selection-manager";
import { SoundBoard } from "./components/sound-board";
import { SoundPicker } from "./components/sound-picker";
import ActiveTileManager from "./components/active-tile-manager";

interface PageProps {
  params: {
    id: string;
  };
}

export interface Project {
  title: string;
  createdAt: string;
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
  const [project, setProject] = useState<Project>();
  const context = useContext(SoundBoardsContext);

  useEffect(() => {
    const project = JSON.parse(
      localStorage.getItem(`project${params.id}`) as string,
    );
    if (project == null) notFound();
    setProject(project);
  }, [params.id]);

  return (
    <div className="flex h-screen w-screen bg-cyan-950 p-5">
      <div className="flex w-3/5 flex-col items-center">
        <Metronome />
        <BoardSelectionManager />

        <div className="divider" />

        {context.soundBoardsState.map((board, id) => (
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
