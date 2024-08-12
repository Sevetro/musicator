"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { MetronomeContextProvider } from "./context/metronome-context";
import { SoundBoardsContextProvider } from "./context/sound-boards-context";
import { PageProps } from "../../../../.next/types/app/layout";
import { Metronome } from "./components/metronome";
import { DefaultWrapperProps } from "@/models/default-props";

interface CustomPageProps extends PageProps {
  params: {
    id: string;
  };
}

export interface Project {
  title: string;
  createdAt: string;
}

export default function ProjectPage({ params }: CustomPageProps) {
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    if (window !== undefined) {
      const project = JSON.parse(
        localStorage.getItem(`project${params.id}`) as string
      );
      if (project == null) notFound();
      setProject(project);
    }
  }, [params.id]);

  return (
    <DndProvider backend={HTML5Backend}>
      <MetronomeContextProvider>
        <SoundBoardsContextProvider>
          <MainContainer>
            <CentralColumn>
              <Metronome />
              {/* <BoardSelectionManager />

              {soundBoardsState.map((board, id) => (
                <SoundBoard
                  key={id}
                  boardId={id}
                  active={board.active}
                  sounds={board.sounds}
                />
              ))} */}
            </CentralColumn>

            {/* <RightColumn span={7}>
              <Space direction="vertical">
                <SoundPicker />
                <Divider />
                <ActiveTileManager />
              </Space>
            </RightColumn> */}
          </MainContainer>
        </SoundBoardsContextProvider>
      </MetronomeContextProvider>
    </DndProvider>
  );
}

const MainContainer = ({ children }: DefaultWrapperProps) => (
  <div className="p-10 bg-cyan-600 w-full h-screen box-border">{children}</div>
);

const CentralColumn = ({ children }: DefaultWrapperProps) => (
  <div className="flex flex-col items-center">{children}</div>
);
