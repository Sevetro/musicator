import { FC } from "react";
import { useDrag } from "react-dnd";

import { dragAndDropTypes } from "../../constants/dragAndDropTypes";
import { DragAndDropTile } from "../../styled/DragAndDropTile";

interface BoardSelectionTileProps {
  id: number;
  active: boolean;
  setActiveBoard: (id: number) => void;
}

export interface BoardSelectionTileItem {
  id: number;
}

const { BOARD_TILE } = dragAndDropTypes;

export const BoardSelectionTile: FC<BoardSelectionTileProps> = ({
  id,
  active,
  setActiveBoard,
}) => {
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
    <DragAndDropTile
      onClick={() => setActiveBoard(id)}
      small
      isDragging={isDragging}
      ref={drag}
      active={active}
    >
      {id + 1}
    </DragAndDropTile>
  );
};
