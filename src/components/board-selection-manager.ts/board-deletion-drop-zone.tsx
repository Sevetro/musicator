import { FC, useContext } from "react";
import { useDrop } from "react-dnd";
import { DeleteOutlined } from "@ant-design/icons";

import { BoardSelectionTileItem } from "./board-selection-tile";
import { DragAndDropTile } from "../../styled/drag-and-drop-tile";
import { SoundBoardsContext } from "../../data/sound-boards-context";
import { DragAndDropTypes } from "../../constants/drag-and-drop-types";

const { BOARD_TILE } = DragAndDropTypes;

export const BoardDeletionDropZone: FC = () => {
  const { handleSoundBoardDrop } = useContext(SoundBoardsContext);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: BOARD_TILE,
      drop: (item: BoardSelectionTileItem) => handleSoundBoardDrop(item.id),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [handleSoundBoardDrop]
  );

  return (
    <DragAndDropTile deletionDropZone small isOver={isOver} ref={drop}>
      <DeleteOutlined />
    </DragAndDropTile>
  );
};
