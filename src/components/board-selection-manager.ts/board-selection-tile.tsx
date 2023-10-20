import { FC, useContext } from "react";
import { useDrag } from "react-dnd";

import { DragAndDropTypes } from "../../constants/drag-and-drop-types";
import { DragAndDropTile } from "../../styled/drag-and-drop-tile";
import { SoundBoardsContext } from "../../data/sound-boards-context";

interface BoardSelectionTileProps {
  id: number;
  active: boolean;
}

export interface BoardSelectionTileItem {
  id: number;
}

const { BOARD_TILE } = DragAndDropTypes;

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
