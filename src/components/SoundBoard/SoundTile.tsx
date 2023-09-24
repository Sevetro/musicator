import { FC, useContext, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";

import { DragAndDropTypes } from "../../constants/dragAndDropTypes";
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

const { PICKER_TILE, SOUND_TILE } = DragAndDropTypes;

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
      item: { id, sound, type: DragAndDropTypes.SOUND_TILE },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    //TODO: check what if the rest of sound notes changes
    [sound.note]
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: [SOUND_TILE, PICKER_TILE],
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
