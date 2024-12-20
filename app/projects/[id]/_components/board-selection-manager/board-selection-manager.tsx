import { useContext, useState } from "react";

import { BoardSelectionTile } from "./board-selection-tile";
import { BoardDeletionDropZone } from "./board-deletion-drop-zone";
import { SoundBoardsContext } from "../../_context/sound-boards-context";

export const BoardSelectionManager = () => {
  const {
    soundBoardsState,
    removeSoundBoard,
    addSoundBoard,
    renameSoundBoard,
    toggleMuteSoundBoard,
    activeSoundBoardId,
  } = useContext(SoundBoardsContext);
  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState("");

  function handleRename() {
    renameSoundBoard(name);
    setIsRenaming(false);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-[3px]">
        {isRenaming ? (
          <>
            <input
              className="input input-xs input-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="btn btn-primary btn-xs" onClick={handleRename}>
              OK
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-primary btn-xs rounded-md"
              onClick={() => setIsRenaming(true)}
            >
              Rename
            </button>
            <button
              className="btn btn-primary btn-xs rounded-md"
              onClick={toggleMuteSoundBoard}
            >
              {soundBoardsState[activeSoundBoardId]?.isMuted
                ? "Unmute"
                : "Mute"}
            </button>
          </>
        )}
      </div>

      <div className="mt-[4px] flex space-x-[3px]">
        <button
          className={`btn btn-xs w-6 rounded-md ${soundBoardsState.length === 1 ? "btn-disabled" : "btn-primary"}`}
          onClick={removeSoundBoard}
        >
          -
        </button>
        <BoardDeletionDropZone />
        {soundBoardsState.map((soundBoard, id) => (
          <BoardSelectionTile
            key={id}
            id={id}
            isActive={soundBoard.isActive}
            isMuted={soundBoard.isMuted}
            name={soundBoard.name}
          />
        ))}
        <button
          className={`btn btn-primary btn-xs w-6 rounded-md`}
          onClick={addSoundBoard}
        >
          +
        </button>
      </div>
    </div>
  );
};
