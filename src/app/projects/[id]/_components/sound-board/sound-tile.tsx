import { FC, useContext, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { start } from "tone";

import { DragAndDropTypes } from "../../_constants/drag-and-drop-types";
import { DraggableSoundTile } from "../../_models/draggable-sound-tile";
import { getSoundTileWidth } from "../../_utils/sound-tile-width";
import { MetronomeContext } from "../../_context/metronome-context";
import { Sound } from "@/app/projects/_models/sound";

interface SoundTileProps {
  id: number;
  sound: Sound;
  isActive: boolean;
  handleDrop: (
    sourceTile: DraggableSoundTile,
    targetTile: DraggableSoundTile,
  ) => void;
  playSound: () => void;
  position: number;
}

const { PICKER_TILE, SOUND_TILE } = DragAndDropTypes;

export const SoundTile: FC<SoundTileProps> = ({
  id,
  sound,
  isActive,
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
    [sound],
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: [SOUND_TILE, PICKER_TILE],
      drop: (item: DraggableSoundTile) => handleDrop(item, { id, sound }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [handleDrop],
  );

  async function handleTileClick() {
    await start();
    setMetronomeActive(false);
    setMetronomeTicks(position);
    playSound();
  }

  useEffect(() => {
    if (isActive && metronomeActive) {
      playSound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, metronomeActive]);

  return (
    <div
      style={{ width: getSoundTileWidth(sound.duration) }}
      className={
        "flex h-8 cursor-pointer items-center justify-center rounded-md border border-solid border-gray-400 text-center " +
        `${isDragging || (isOver && "opacity-60")} ${isActive ? "bg-green-500" : "bg-stone-300"}`
      }
      ref={(node) => drag(drop(node)) as any}
      onClick={handleTileClick}
    >
      {sound.note}
    </div>
  );
};
