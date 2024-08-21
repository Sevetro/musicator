import { FC } from "react";
import { useDrag } from "react-dnd";

import { DragAndDropTypes } from "../../_constants/drag-and-drop-types";
import { Sound } from "../../_models/sound";
import { DragAndDropTile } from "../drag-and-drop-tile";
import { soundDurationToWidthMap } from "../../_utils/sound-tile-width";

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

  return (
    <DragAndDropTile
      className="mt-[2px]"
      width={soundDurationToWidthMap[sound.duration]}
      onClick={playSound}
      ref={drag as any}
      isDragging={isDragging}
    >
      {sound.note}
    </DragAndDropTile>
  );
};
