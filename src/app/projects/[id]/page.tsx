"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { MetronomeContextProvider } from "./context/metronome-context";
import { SoundBoardsContextProvider } from "./context/sound-boards-context";
import { Metronome } from "./components/metronome";
import { DefaultWrapperProps } from "@/models/default-props";
import { BoardSelectionManager } from "./components/board-selection-manager/board-selection-manager";

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
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    const project = JSON.parse(
      localStorage.getItem(`project${params.id}`) as string,
    );
    if (project == null) notFound();
    setProject(project);
  }, [params.id]);

  return (
    <DndProvider backend={HTML5Backend}>
      <MetronomeContextProvider>
        <SoundBoardsContextProvider>
          <div className="box-border h-screen w-full bg-cyan-950 p-10">
            <div className="flex flex-col items-center">
              <Metronome />
              <BoardSelectionManager />

              {/* {soundBoardsState.map((board, id) => (
                <SoundBoard
                  key={id}
                  boardId={id}
                  active={board.active}
                  sounds={board.sounds}
                />
              ))} */}
            </div>

            {/* <RightColumn span={7}>
              <Space direction="vertical">
                <SoundPicker />
                <Divider />
                <ActiveTileManager />
              </Space>
            </RightColumn> */}
          </div>
        </SoundBoardsContextProvider>
      </MetronomeContextProvider>
    </DndProvider>
  );
}
