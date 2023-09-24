import { FC, useContext } from "react";
import { useDrag } from "react-dnd";

import { dragAndDropTypes } from "../../constants/dragAndDropTypes";
import { DragAndDropTile } from "../../styled/DragAndDropTile";
import { SoundBoardsContext } from "../../data/SoundBoardsContext";

interface BoardSelectionTileProps {
  id: number;
  active: boolean;
}

export interface BoardSelectionTileItem {
  id: number;
}

const { BOARD_TILE } = dragAndDropTypes;

export const BoardSelectionTile: FC<BoardSelectionTileProps> = ({
  id,
  active,
}) => {
  const { setActiveSoundBoard } = useContext(SoundBoardsContext);
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
      onClick={() => setActiveSoundBoard(id)}
      small
      isDragging={isDragging}
      ref={drag}
      active={active}
    >
      {id + 1}
    </DragAndDropTile>
  );
};
