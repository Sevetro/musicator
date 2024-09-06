"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { notFound } from "next/navigation";

import { Metronome } from "./_components/metronome";
import { BoardSelectionManager } from "./_components/board-selection-manager/board-selection-manager";
import { SoundPicker } from "./_components/sound-picker";
import { SoundBoard } from "./_components/sound-board/sound-board";
import GoToProjectList from "@/_components/go-to-project-list-buttton";
import { Project, ProjectMetadata } from "../_models/project";
import { SoundBoardsContext } from "./_context/sound-boards-context";
import { MetronomeContext } from "./_context/metronome-context";
import { showTutorialFlagKey } from "@/_constants/local-storage-keys";
import { tutorialStepsData } from "./_constants/tutorial-data";
import { generateTutorialClassName } from "./_utils/tutorial";
import { TutorialModal } from "./_components/tutorial-modal";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: PageProps) {
  const { soundBoardsState, setSoundBoardsState } =
    useContext(SoundBoardsContext);
  const { bpm, setBpm } = useContext(MetronomeContext);
  const [projectMetaData, setProjectMetaData] = useState<ProjectMetadata>();
  const [tutorialStep, setTutorialStep] = useState<number>();
  const [isTutorialModalOpen, setTutorialModalOpen] = useState(false);

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

  function handleCloseTutorial() {
    setTutorialModalOpen(false);
    localStorage.setItem(showTutorialFlagKey, "false");
    setTutorialStep(undefined);
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
    setBpm(project.bpm);
  }, [params.id, setBpm, setSoundBoardsState]);

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

      <div className={`flex w-3/4 flex-col items-center`}>
        <div className={generateTutorialClassName(tutorialStep, 0)}>
          <Metronome />
        </div>
        <div className="divider" />
        <div className={generateTutorialClassName(tutorialStep, 1)}>
          <BoardSelectionManager />
        </div>
        <div className="divider" />
        <div className={generateTutorialClassName(tutorialStep, 2)}>
          {soundBoardsState.map((board, id) => (
            <SoundBoard
              key={id}
              boardId={id}
              isActive={board.isActive}
              sounds={[...board.sounds]}
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
        <div className="absolute left-0 right-0 top-1/2 mx-auto flex w-[600px] flex-col items-center rounded-lg border-2 p-4">
          <div className="mb-4 text-xl">Tutorial</div>
          <div>{tutorialStepsData[tutorialStep].content}</div>
          <ul className="steps mt-7">
            {tutorialSteps}
            <li
              className="step step-error cursor-pointer"
              onClick={() => setTutorialModalOpen(true)}
            >
              Close tutorial
            </li>
          </ul>
        </div>
      )}

      <TutorialModal
        visible={isTutorialModalOpen}
        onCancel={() => setTutorialModalOpen(false)}
        onClose={handleCloseTutorial}
      />
    </div>
  );
}
