import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

import { MetronomeContext } from "./MetronomeContext";

interface SoundBoard {
  active: boolean;
  notes: string[];
}

const initialSoundBoardsState: SoundBoard[] = [
  {
    active: true,
    notes: ["A", "B", "C", "D"],
  },
  {
    active: false,
    notes: ["E", "F", "G", "A"],
  },
];

interface SoundBoardsContext {
  soundBoardsState: SoundBoard[];
  setActiveBoard: (id: number) => void;
  handleAddBoard: () => void;
  handleRemoveBoard: () => void;
  handleDeleteBoardOnDrop: (id: number) => void;
  handleAddSoundTile: (soundBoardId: number) => void;
  handleRemoveSoundTile: (soundBoardId: number) => void;
  handleSoundTileDrop: (
    soundBoardId: number,
    tileId: number,
    note: string
  ) => void;
}

const defaultSoundBoardsContextValues: SoundBoardsContext = {
  soundBoardsState: initialSoundBoardsState,
  setActiveBoard: () => null,
  handleAddBoard: () => null,
  handleRemoveBoard: () => null,
  handleDeleteBoardOnDrop: () => null,
  handleAddSoundTile: () => null,
  handleRemoveSoundTile: () => null,
  handleSoundTileDrop: () => null,
};

export const SoundBoardsContext = createContext(
  defaultSoundBoardsContextValues
);

export const SoundBoardsContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [soundBoardsState, setSoundBoards] = useState(initialSoundBoardsState);
  const { resetMetronome } = useContext(MetronomeContext);

  function setActiveBoard(id: number) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards.forEach((board) => (board.active = false));
    newSoundBoards[id].active = true;
    setSoundBoards(newSoundBoards);
  }

  function handleDeleteBoardOnDrop(id: number) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards.splice(id, 1);
    newSoundBoards[0].active = true;
    setSoundBoards(newSoundBoards);
  }

  function handleRemoveBoard() {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards.pop();
    setSoundBoards(newSoundBoards);
  }

  function handleAddBoard() {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards.push({
      active: false,
      notes: [""],
    });
    setSoundBoards(newSoundBoards);
  }

  function handleSoundTileDrop(
    soundBoardId: number,
    tileId: number,
    note: string
  ) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[soundBoardId].notes[tileId] = note;
    setSoundBoards(newSoundBoards);
  }

  function handleAddSoundTile(soundBoardId: number) {
    resetMetronome();
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[soundBoardId].notes.push("");
    setSoundBoards(newSoundBoards);
  }

  function handleRemoveSoundTile(soundBoardId: number) {
    resetMetronome();
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[soundBoardId].notes.pop();
    setSoundBoards(newSoundBoards);
  }

  return (
    <SoundBoardsContext.Provider
      value={{
        soundBoardsState,
        setActiveBoard,
        handleAddBoard,
        handleRemoveBoard,
        handleDeleteBoardOnDrop,
        handleAddSoundTile,
        handleRemoveSoundTile,
        handleSoundTileDrop,
      }}
    >
      {children}
    </SoundBoardsContext.Provider>
  );
};
