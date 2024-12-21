import { useContext } from "react";
import { useDrop } from "react-dnd";
import { TrashIcon } from "@heroicons/react/24/outline";

import { BoardSelectionTileItem } from "./board-selection-tile";
import { DragAndDropTypes } from "../../_constants/drag-and-drop-types";
import { SoundBoardsContext } from "../../_context/sound-boards-context";

const { BOARD_TILE } = DragAndDropTypes;

export const BoardDeletionDropZone = () => {
  const { handleSoundBoardDrop } = useContext(SoundBoardsContext);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: BOARD_TILE,
      drop: (item: BoardSelectionTileItem) => handleSoundBoardDrop(item.id),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [handleSoundBoardDrop],
  );

  return (
    <div
      className={`flex w-[30px] items-center justify-center rounded-md border border-solid border-gray-400 bg-red-700 ${isOver && "opacity-60"}`}
      ref={drop as any}
    >
      <TrashIcon width={18} height={18} />
    </div>
  );
};
