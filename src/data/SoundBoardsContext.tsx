import { FC, PropsWithChildren, createContext, useState } from "react";

import { Sound } from "../models/Sound";
import { DraggableSoundTile } from "../models/DraggableSoundTile";
import { DragAndDropTypes } from "../constants/DragAndDropTypes";

interface SoundBoard {
  active: boolean;
  sounds: Sound[];
}

const emptySound: Sound = { note: "", duration: "8n" };

const initialSoundBoardsState: SoundBoard[] = [
  {
    active: true,
    sounds: [
      { note: "F4", duration: "1n" },
      { note: "G4", duration: "1n" },
      { note: "F4", duration: "2n" },
      { note: "G4", duration: "2n" },
      { note: "A5", duration: "4n" },
      { note: "C5", duration: "4n" },
      { note: "D5", duration: "4n" },
      { note: "E5", duration: "4n" },
    ],
  },
  // {
  //   active: false,
  //   sounds: [
  //     { note: "A5", duration: "8n" },
  //     { note: "B5", duration: "8n" },
  //     { note: "C5", duration: "8n" },
  //     { note: "", duration: "8n" },
  //   ],
  // },
  // {
  //   active: false,
  //   sounds: [
  //     { note: "C5", duration: "8n" },
  //     { note: "D5", duration: "8n" },
  //     { note: "E6", duration: "8n" },
  //     { note: "", duration: "8n" },
  //   ],
  // },
];

interface SoundBoardsContext {
  soundBoardsState: SoundBoard[];
  setActiveSoundBoard: (id: number) => void;
  addSoundBoard: () => void;
  removeSoundBoard: () => void;
  handleSoundBoardDrop: (id: number) => void;
  addSoundTile: (boardId: number) => void;
  removeSoundTile: (boardId: number) => void;
  handleSoundTileDrop: (
    boardId: number,
    sourceTile: DraggableSoundTile,
    targetTile: DraggableSoundTile
  ) => void;
  handleSoundTileDeletionDrop: (boardId: number, tileId: number) => void;
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
  handleSoundTileDeletionDrop: () => null,
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

  function handleSoundTileDeletionDrop(boardId: number, tileId: number) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[boardId].sounds[tileId] = emptySound;
    setSoundBoards(newSoundBoards);
  }

  function handleSoundTileDrop(
    boardId: number,
    sourceTile: DraggableSoundTile,
    targetTile: DraggableSoundTile
  ) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[boardId].sounds[targetTile.id] = sourceTile.sound;
    if (sourceTile.type === DragAndDropTypes.SOUND_TILE) {
      newSoundBoards[boardId].sounds[sourceTile.id] = targetTile.sound;
    }
    setSoundBoards(newSoundBoards);
  }

  function addSoundTile(boardId: number) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[boardId].sounds.push({ note: "", duration: "8n" });
    setSoundBoards(newSoundBoards);
  }

  function removeSoundTile(boardId: number) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[boardId].sounds.pop();
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
        handleSoundTileDeletionDrop,
      }}
    >
      {children}
    </SoundBoardsContext.Provider>
  );
};
