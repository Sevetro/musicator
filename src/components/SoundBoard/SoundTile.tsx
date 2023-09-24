import { FC, useContext, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";

import { dragAndDropTypes } from "../../constants/dragAndDropTypes";
import { MetronomeContext } from "../../data/MetronomeContext";
import { DragAndDropTile } from "../../styled/DragAndDropTile";
import { Sound } from "../../models/Sound";
import { DraggableSoundTile } from "../../models/DraggableSoundTile";

interface SoundTileProps {
  id: number;
  sound: Sound;
  active: boolean;
  handleDrop: (
    sourceTile: DraggableSoundTile,
    targetTile: DraggableSoundTile
  ) => void;
  playSound: () => void;
}

const { NOTE_TILE, SOUND_TILE } = dragAndDropTypes;

export const SoundTile: FC<SoundTileProps> = ({
  id,
  sound,
  active,
  handleDrop,
  playSound,
}) => {
  const { setMetronomeTicks, metronomeActive, setMetronomeActive } =
    useContext(MetronomeContext);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: SOUND_TILE,
      item: { id, sound },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [sound.note]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: [SOUND_TILE, NOTE_TILE],
      drop: (item: DraggableSoundTile) => handleDrop(item, { id, sound }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [handleDrop]
  );

  function handleTileClick() {
    setMetronomeActive(false);
    setMetronomeTicks(id);
    playSound();
  }

  useEffect(() => {
    if (active && metronomeActive) {
      playSound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <DragAndDropTile
      isOver={isOver}
      isDragging={isDragging}
      ref={(node) => drag(drop(node))}
      active={active}
      onClick={handleTileClick}
    >
      {sound.note}
    </DragAndDropTile>
  );
};
