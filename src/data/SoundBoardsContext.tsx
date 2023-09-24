import { FC, PropsWithChildren, createContext, useState } from "react";

import { Sound } from "../models/Sound";
import { DraggableSoundTile } from "../models/DraggableSoundTile";

interface SoundBoard {
  active: boolean;
  sounds: Sound[];
}

const emptySound = { note: "", duration: "8n" };

const initialSoundBoardsState: SoundBoard[] = [
  {
    active: true,
    sounds: [
      { note: "F4", duration: "8n" },
      { note: "G4", duration: "8n" },
      { note: "A5", duration: "8n" },
      { note: "", duration: "8n" },
    ],
  },
  {
    active: false,
    sounds: [
      { note: "A5", duration: "8n" },
      { note: "B5", duration: "8n" },
      { note: "C5", duration: "8n" },
      { note: "", duration: "8n" },
    ],
  },
  {
    active: false,
    sounds: [
      { note: "C5", duration: "8n" },
      { note: "D5", duration: "8n" },
      { note: "E6", duration: "8n" },
      { note: "", duration: "8n" },
    ],
  },
];

interface SoundBoardsContext {
  soundBoardsState: SoundBoard[];
  setActiveSoundBoard: (id: number) => void;
  addSoundBoard: () => void;
  removeSoundBoard: () => void;
  handleSoundBoardDrop: (id: number) => void;
  addSoundTile: (soundBoardId: number) => void;
  removeSoundTile: (soundBoardId: number) => void;
  handleSoundTileDrop: (
    soundBoardId: number,
    sourceTile: DraggableSoundTile,
    targetTile: DraggableSoundTile
  ) => void;
}

const defaultSoundBoardsContextValues: SoundBoardsContext = {
  soundBoardsState: initialSoundBoardsState,
  setActiveSoundBoard: () => null,
  addSoundBoard: () => null,
  removeSoundBoard: () => null,
  handleSoundBoardDrop: () => null,
  addSoundTile: () => null,
  removeSoundTile: () => null,
  handleSoundTileDrop: () => null,
};

export const SoundBoardsContext = createContext(
  defaultSoundBoardsContextValues
);

export const SoundBoardsContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [soundBoardsState, setSoundBoards] = useState(initialSoundBoardsState);

  function setActiveSoundBoard(id: number) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards.forEach((board) => (board.active = false));
    newSoundBoards[id].active = true;
    setSoundBoards(newSoundBoards);
  }

  function handleSoundBoardDrop(id: number) {
    const newSoundBoards = [...soundBoardsState];
    if (newSoundBoards.length > 1) {
      newSoundBoards.splice(id, 1);
      newSoundBoards.forEach((board) => (board.active = false));
      newSoundBoards[0].active = true;
    } else {
      newSoundBoards[0] = {
        active: true,
        sounds: [emptySound],
      };
    }
    setSoundBoards(newSoundBoards);
  }

  function removeSoundBoard() {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards.pop();
    setSoundBoards(newSoundBoards);
  }

  function addSoundBoard() {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards.push({
      active: newSoundBoards.length > 0 ? false : true,
      sounds: [emptySound],
    });
    setSoundBoards(newSoundBoards);
  }

  function handleSoundTileDrop(
    soundBoardId: number,
    sourceTile: DraggableSoundTile,
    targetTile: DraggableSoundTile
  ) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[soundBoardId].sounds[targetTile.id] = sourceTile.sound;
    newSoundBoards[soundBoardId].sounds[sourceTile.id] = targetTile.sound;
    setSoundBoards(newSoundBoards);
  }

  function addSoundTile(soundBoardId: number) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[soundBoardId].sounds.push({ note: "", duration: "8n" });
    setSoundBoards(newSoundBoards);
  }

  function removeSoundTile(soundBoardId: number) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[soundBoardId].sounds.pop();
    setSoundBoards(newSoundBoards);
  }

  return (
    <SoundBoardsContext.Provider
      value={{
        soundBoardsState,
        setActiveSoundBoard,
        addSoundBoard,
        removeSoundBoard,
        handleSoundBoardDrop,
        addSoundTile,
        removeSoundTile,
        handleSoundTileDrop,
      }}
    >
      {children}
    </SoundBoardsContext.Provider>
  );
};
