import { FC } from "react";
import { useDrag } from "react-dnd";
import { start } from "tone";

import { DragAndDropTypes } from "../../_constants/drag-and-drop-types";
import { getSoundTileWidth } from "../../_utils/sound-tile-width";
import { Sound } from "../../../_models/sound";

interface SoundPickerTileProps {
  sound: Sound;
  playSound: () => void;
}

export const SoundPickerTile: FC<SoundPickerTileProps> = ({
  sound,
  playSound,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DragAndDropTypes.PICKER_TILE,
      item: { sound },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [sound],
  );

  async function handlePlaySound() {
    await start();
    playSound();
  }

  return (
    <div
      style={{ width: getSoundTileWidth(sound.duration) }}
      className={`mt-[2px] h-8 cursor-pointer rounded-md border border-solid border-gray-400 bg-stone-300 text-center ${isDragging && "opacity-60"} `}
      onClick={handlePlaySound}
      ref={drag as any}
    >
      {sound.note}
    </div>
  );
};
