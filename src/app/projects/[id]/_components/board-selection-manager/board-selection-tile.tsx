import { useContext } from "react";
import { useDrag } from "react-dnd";

import { DragAndDropTypes } from "../../_constants/drag-and-drop-types";
import { DragAndDropTile } from "../drag-and-drop-tile";
import { SoundBoardsContext } from "../../_context/sound-boards-context";

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
      className="mx-[1px]"
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
