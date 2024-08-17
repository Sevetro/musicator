import { useContext } from "react";

import { BoardSelectionTile } from "./board-selection-tile";
import { SoundBoardsContext } from "../../context/sound-boards-context";
import { BoardDeletionDropZone } from "./board-deletion-drop-zone";

export const BoardSelectionManager = () => {
  const { soundBoardsState, removeSoundBoard, addSoundBoard } =
    useContext(SoundBoardsContext);

  const boardsActiveProps = soundBoardsState.map((board) => board.active);

  return (
    <div className="mt-5 flex flex-col rounded-xl border-2 border-solid border-blue-400 p-1">
      <div className="flex">
        <button className="btn btn-primary" onClick={removeSoundBoard}>
          -
        </button>
        <BoardDeletionDropZone />
        <button className="btn btn-primary" onClick={addSoundBoard}>
          +
        </button>
      </div>

      <div className="flex">
        {boardsActiveProps.map((active, id) => (
          <BoardSelectionTile key={id} id={id} active={active} />
        ))}
      </div>
    </div>
  );
};
