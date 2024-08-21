import { useContext } from "react";

import { BoardSelectionTile } from "./board-selection-tile";
import { SoundBoardsContext } from "../../context/sound-boards-context";
import { BoardDeletionDropZone } from "./board-deletion-drop-zone";

export const BoardSelectionManager = () => {
  const { soundBoardsState, removeSoundBoard, addSoundBoard } =
    useContext(SoundBoardsContext);

  return (
    <div className="mt-5 flex flex-col items-center border-b-2 border-solid border-blue-400 pb-[2px]">
      <div className="flex">
        <button
          className="btn btn-primary btn-xs w-6 rounded-md"
          onClick={removeSoundBoard}
        >
          -
        </button>
        <BoardDeletionDropZone />
        <button
          className="btn btn-primary btn-xs w-6 rounded-md"
          onClick={addSoundBoard}
        >
          +
        </button>
      </div>

      <div className="mt-[2px] flex">
        {soundBoardsState.map((soundBoard, id) => (
          <BoardSelectionTile key={id} id={id} active={soundBoard.active} />
        ))}
      </div>
    </div>
  );
};
