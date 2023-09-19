import { FC } from "react";
import { useDrag } from "react-dnd";

import { dragAndDropTypes } from "../../constants/dragAndDropTypes";
import { DragAndDropTile } from "../../styled/DragAndDropTile";

interface NoteTileProps {
  note: string;
}

export const NoteTile: FC<NoteTileProps> = ({ note }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: dragAndDropTypes.NOTE_TILE,
    item: { note },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <DragAndDropTile ref={drag} isDragging={isDragging}>
      {note}
    </DragAndDropTile>
  );
};
