"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useContext, useEffect, useMemo, useState } from "react";
import { notFound } from "next/navigation";

import { Metronome } from "./_components/metronome";
import { BoardSelectionManager } from "./_components/board-selection-manager/board-selection-manager";
import { SoundPicker } from "./_components/sound-picker";
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
import { showTutorialFlagKey } from "@/_constants/local-storage-keys";
import { tutorialStepsData } from "./_constants/tutorial";
import { generateTutorialClassName } from "./_utils/tutorial";

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
  const { soundBoardsState, setSoundBoardsState } =
    useContext(SoundBoardsContext);
  const { bpm } = useContext(MetronomeContext);
  const [projectMetaData, setProjectMetaData] = useState<ProjectMetadata>();
  const [tutorialStep, setTutorialStep] = useState<number>();

  const tutorialSteps = useMemo(
    () =>
      tutorialStep !== undefined &&
      tutorialStepsData.map((stepData, index) => (
        <li
          key={index}
          className={`step cursor-pointer ${index <= tutorialStep && "step-primary"}`}
          onClick={() => setTutorialStep(index)}
        >
          {stepData.title}
        </li>
      )),
    [tutorialStep],
  );

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
    setProjectMetaData({
      title: project.title,
      createdAt: project.createdAt,
    });
    setSoundBoardsState(project.soundBoardsState);
  }, [params.id, setSoundBoardsState]);

  useEffect(() => {
    const showTutorialFlag = localStorage.getItem(showTutorialFlagKey);
    if (showTutorialFlag === null || showTutorialFlag === "true") {
      setTutorialStep(0);
    }
  }, []);

  return (
    <div className="flex h-screen w-screen p-5">
      <div
        className={`${tutorialStep !== undefined && "opacity-15"} absolute flex`}
      >
        <GoToProjectList />
        <button onClick={save} className="btn btn-primary ml-1">
          Save
        </button>
      </div>

      <div className={`flex w-3/5 flex-col items-center`}>
        <div className={generateTutorialClassName(tutorialStep, 0)}>
          <Metronome />
        </div>
        <div className={generateTutorialClassName(tutorialStep, 1)}>
          <BoardSelectionManager />
        </div>
        <div className="divider" />
        <div className={generateTutorialClassName(tutorialStep, 2)}>
          {soundBoardsState.map((board, id) => (
            <SoundBoard
              key={id}
              boardId={id}
              active={board.active}
              sounds={board.sounds}
            />
          ))}
        </div>
      </div>

      <div
        className={
          "flex w-2/5 flex-col " + generateTutorialClassName(tutorialStep, 3)
        }
      >
        <SoundPicker />
      </div>

      {tutorialStep !== undefined && (
        <div
          className={
            "absolute left-0 right-0 top-1/2 mx-auto flex w-[600px] flex-col " +
            "items-center rounded-lg border-2 p-4"
          }
        >
          <div className="mb-4 text-xl">Tutorial</div>
          <div>{tutorialStepsData[tutorialStep].content}</div>
          <ul className="steps mt-7">{tutorialSteps}</ul>
        </div>
      )}
    </div>
  );
}
