"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { MetronomeContextProvider } from "./_context/metronome-context";
import { SoundBoardsContextProvider } from "./_context/sound-boards-context";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <MetronomeContextProvider>
          <SoundBoardsContextProvider>{children}</SoundBoardsContextProvider>
        </MetronomeContextProvider>
      </DndProvider>
    </div>
  );
}
