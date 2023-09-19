import { FC } from "react";
import { useDrag } from "react-dnd";

import { dragAndDropTypes } from "../../constants/dragAndDropTypes";
import { DragAndDropTile } from "../../styled/DragAndDropTile";

interface BoardSelectionTileProps {
  id: number;
}

export interface BoardSelectionTileItem {
  id: number;
}

const { BOARD_TILE } = dragAndDropTypes;

export const BoardSelectionTile: FC<BoardSelectionTileProps> = ({ id }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: BOARD_TILE,
      item: { id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id]
  );

  return (
    <DragAndDropTile small isDragging={isDragging} ref={drag}>
      {id + 1}
    </DragAndDropTile>
  );
};
