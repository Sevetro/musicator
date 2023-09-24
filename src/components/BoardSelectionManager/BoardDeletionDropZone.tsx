import { FC, useContext } from "react";
import { useDrop } from "react-dnd";
import { DeleteOutlined } from "@ant-design/icons";

import { dragAndDropTypes } from "../../constants/dragAndDropTypes";
import { BoardSelectionTileItem } from "./BoardSelectionTile";
import { DragAndDropTile } from "../../styled/DragAndDropTile";
import { SoundBoardsContext } from "../../data/SoundBoardsContext";

const { BOARD_TILE } = dragAndDropTypes;

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
