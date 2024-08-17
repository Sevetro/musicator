import { useContext } from "react";
import { useDrop } from "react-dnd";
import { TrashIcon } from "@heroicons/react/24/outline";

import { BoardSelectionTileItem } from "./board-selection-tile";
import { DragAndDropTypes } from "../../constants/drag-and-drop-types";
import { SoundBoardsContext } from "../../context/sound-boards-context";
import { DragAndDropTile } from "../drag-and-drop-tile";

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
    <DragAndDropTile isOver={isOver} deletionDropZone small ref={drop as any}>
      <TrashIcon width={20} height={20} />
    </DragAndDropTile>
  );
};
