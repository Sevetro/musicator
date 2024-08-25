import { useContext } from "react";
import { useDrag } from "react-dnd";

import { DragAndDropTypes } from "../../_constants/drag-and-drop-types";
import { SoundBoardsContext } from "../../_context/sound-boards-context";

interface BoardSelectionTileProps {
  id: number;
  isActive: boolean;
  isMuted: boolean;
  name: string | undefined;
}

export interface BoardSelectionTileItem {
  id: number;
}

const { BOARD_TILE } = DragAndDropTypes;

export const BoardSelectionTile = ({
  id,
  isActive,
  isMuted,
  name,
}: BoardSelectionTileProps) => {
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
    <div
      className={
        "h-6 cursor-pointer rounded-md border border-solid border-gray-400 text-center " +
        `${isMuted ? "opacity-10" : isDragging && "opacity-60"} ${isActive ? "bg-green-500" : "bg-stone-300"} ${name === undefined ? "w-[30px]" : "w-fit px-1"}`
      }
      onClick={() => setActiveSoundBoard(id)}
      ref={drag as any}
    >
      {name === undefined ? id + 1 : name}
    </div>
  );
};
