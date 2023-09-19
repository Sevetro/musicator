import { FC, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";

import { dragAndDropTypes } from "../../constants/dragAndDropTypes";
import { MetronomeContext } from "../../data/MetronomeContext";
import { DragAndDropTile } from "../../styled/DragAndDropTile";

interface SoundTileProps {
  id: number;
  note: string;
  active: boolean;
  handleDrop: (item: SoundTileItem, id: number) => void;
}

export interface SoundTileItem {
  note: string;
}

const { NOTE_TILE, SOUND_TILE } = dragAndDropTypes;

export const SoundTile: FC<SoundTileProps> = ({
  note,
  id,
  active,
  handleDrop,
}) => {
  const { setMetronomeTicks } = useContext(MetronomeContext);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: SOUND_TILE,
      item: { note },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [note]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: [SOUND_TILE, NOTE_TILE],
      drop: (item: SoundTileItem) => handleDrop(item, id),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [handleDrop]
  );

  return (
    <DragAndDropTile
      isOver={isOver}
      isDragging={isDragging}
      ref={(node) => drag(drop(node))}
      isActive={active}
      onClick={() => setMetronomeTicks(id)}
    >
      {note}
    </DragAndDropTile>
  );
};
