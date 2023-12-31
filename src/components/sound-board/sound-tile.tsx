import { FC, useContext, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";

import { DragAndDropTypes } from "../../constants/drag-and-drop-types";
import { MetronomeContext } from "../../data/metronome-context";
import { DragAndDropTile } from "../../styled/drag-and-drop-tile";
import { Sound } from "../../models/sound";
import { DraggableSoundTile } from "../../models/draggable-sound-tile";
import { durationToTileWidthMap } from "../../utils/sound-tile";

interface SoundTileProps {
  id: number;
  sound: Sound;
  active: boolean;
  handleDrop: (
    sourceTile: DraggableSoundTile,
    targetTile: DraggableSoundTile
  ) => void;
  playSound: () => void;
  position: number;
}

const { PICKER_TILE, SOUND_TILE } = DragAndDropTypes;

export const SoundTile: FC<SoundTileProps> = ({
  id,
  sound,
  active,
  handleDrop,
  playSound,
  position,
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
    [sound]
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
    setMetronomeTicks(position);
    playSound();
  }

  useEffect(() => {
    if (active && metronomeActive) {
      playSound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, metronomeActive]);

  return (
    <DragAndDropTile
      isOver={isOver}
      isDragging={isDragging}
      ref={(node) => drag(drop(node))}
      active={active}
      onClick={handleTileClick}
      width={durationToTileWidthMap[sound.duration]}
    >
      {sound.note}
    </DragAndDropTile>
  );
};
