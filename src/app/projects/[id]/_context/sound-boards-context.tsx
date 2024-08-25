import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";

import { DraggableSoundTile } from "../_models/draggable-sound-tile";
import { DragAndDropTypes } from "../_constants/drag-and-drop-types";
import { Sound } from "../../_models/sound";
import { SoundBoardData } from "../../_models/sound-board";

const emptySound: Sound = { note: "", duration: 1 };

interface SoundBoardsContext {
  soundBoardsState: SoundBoardData[];
  setSoundBoardsState: Dispatch<SetStateAction<SoundBoardData[]>>;
  activeSoundBoardId: number;
  renameSoundBoard: (name: string) => void;
  toggleMuteSoundBoard: () => void;
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
  soundBoardsState: [],
  setSoundBoardsState: () => null,
  activeSoundBoardId: 0,
  renameSoundBoard: () => null,
  toggleMuteSoundBoard: () => null,
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
  const [soundBoardsState, setSoundBoardsState] = useState<SoundBoardData[]>(
    [],
  );
  const activeSoundBoardId = useMemo(
    () => soundBoardsState.findIndex((soundBoard) => soundBoard.isActive),
    [soundBoardsState],
  );

  function renameSoundBoard(name: string) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[activeSoundBoardId].name = name;
    setSoundBoardsState(newSoundBoards);
  }

  function toggleMuteSoundBoard() {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[activeSoundBoardId].isMuted =
      !soundBoardsState[activeSoundBoardId].isMuted;
    setSoundBoardsState(newSoundBoards);
  }

  function setActiveSoundBoard(id: number) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards.forEach((board) => (board.isActive = false));
    newSoundBoards[id].isActive = true;
    setSoundBoardsState(newSoundBoards);
  }

  function handleSoundBoardDrop(id: number) {
    const newSoundBoards = [...soundBoardsState];
    if (newSoundBoards.length > 1) {
      newSoundBoards.splice(id, 1);
      newSoundBoards.forEach((board) => (board.isActive = false));
      newSoundBoards[0].isActive = true;
    } else return;
    setSoundBoardsState(newSoundBoards);
  }

  function removeSoundBoard() {
    const newSoundBoards = [...soundBoardsState];
    const poppedSoundBoard = newSoundBoards.pop();
    if (poppedSoundBoard?.isActive === true) {
      setActiveSoundBoard(newSoundBoards.length - 1);
    }
    setSoundBoardsState(newSoundBoards);
  }

  function addSoundBoard() {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards.push({
      isActive: newSoundBoards.length > 0 ? false : true,
      sounds: [emptySound],
      isMuted: false,
    });
    setSoundBoardsState(newSoundBoards);
  }

  function handleSoundTileDeletionDrop(boardId: number, tileId: number) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[boardId].sounds[tileId] = emptySound;
    setSoundBoardsState(newSoundBoards);
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
    setSoundBoardsState(newSoundBoards);
  }

  function addSoundTile(boardId: number) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[boardId].sounds.push({ note: "", duration: 1 });
    setSoundBoardsState(newSoundBoards);
  }

  function removeSoundTile(boardId: number) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[boardId].sounds.pop();
    setSoundBoardsState(newSoundBoards);
  }

  return (
    <SoundBoardsContext.Provider
      value={{
        soundBoardsState,
        setSoundBoardsState,
        activeSoundBoardId,
        renameSoundBoard,
        toggleMuteSoundBoard,
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
