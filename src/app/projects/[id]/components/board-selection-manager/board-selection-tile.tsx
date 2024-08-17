import { useContext } from "react";
import { useDrag } from "react-dnd";

import { DragAndDropTypes } from "../../constants/drag-and-drop-types";
import { SoundBoardsContext } from "../../context/sound-boards-context";
import { DragAndDropTile } from "../drag-and-drop-tile";

interface BoardSelectionTileProps {
  id: number;
  active: boolean;
}

export interface BoardSelectionTileItem {
  id: number;
}

const { BOARD_TILE } = DragAndDropTypes;

export const BoardSelectionTile = ({ id, active }: BoardSelectionTileProps) => {
  const { setActiveSoundBoard } = useContext(SoundBoardsContext);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: BOARD_TILE,
      item: { id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id],
  );

  return (
    <DragAndDropTile
      onClick={() => setActiveSoundBoard(id)}
      small
      isDragging={isDragging}
      ref={drag as any}
      active={active}
    >
      {id + 1}
    </DragAndDropTile>
  );
};
