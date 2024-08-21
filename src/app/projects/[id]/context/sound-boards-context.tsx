import { FC, PropsWithChildren, createContext, useState } from "react";

import { Sound } from "../models/sound";
import { DraggableSoundTile } from "../models/draggable-sound-tile";
import { DragAndDropTypes } from "../constants/drag-and-drop-types";

interface SoundBoard {
  active: boolean;
  sounds: Sound[];
}

const emptySound: Sound = { note: "", duration: 1 };

const initialSoundBoardsState: SoundBoard[] = [
  {
    active: true,
    sounds: [
      { note: "C2", duration: 4 },
      { note: "E2", duration: 4 },
      { note: "D#2", duration: 2 },
      { note: "D#2", duration: 2 },
      { note: "D#2", duration: 2 },
      { note: "F#2", duration: 2 },
    ],
  },
  {
    active: false,
    sounds: [
      { note: "", duration: 1 },
      { note: "Ab2", duration: 1 },
      { note: "", duration: 1 },
      { note: "Ab2", duration: 1 },
      { note: "", duration: 1 },
      { note: "Ab2", duration: 1 },
      { note: "", duration: 1 },
      { note: "Ab2", duration: 1 },
      { note: "", duration: 1 },
      { note: "A2", duration: 1 },
      { note: "", duration: 1 },
      { note: "A2", duration: 1 },
      { note: "", duration: 1 },
      { note: "A#2", duration: 1 },
      { note: "", duration: 1 },
      { note: "A#2", duration: 1 },
    ],
  },
  {
    active: false,
    sounds: [
      { note: "", duration: 0.5 },
      { note: "Ab2", duration: 0.5 },
      { note: "", duration: 0.25 },
      { note: "Ab2", duration: 0.25 },
      { note: "", duration: 0.25 },
      { note: "Ab2", duration: 0.25 },
    ],
  },
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
    targetTile: DraggableSoundTile,
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
  defaultSoundBoardsContextValues,
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
    targetTile: DraggableSoundTile,
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
    newSoundBoards[boardId].sounds.push({ note: "", duration: 1 });
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
