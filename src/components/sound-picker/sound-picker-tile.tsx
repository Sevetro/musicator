import { FC } from "react";
import { useDrag } from "react-dnd";

import { DragAndDropTypes } from "../../constants/drag-and-drop-types";
import { DragAndDropTile } from "../../styled/drag-and-drop-tile";
import { Sound } from "../../models/sound";
import { durationToTileWidthMap } from "../../utils/sound-tile";

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
    [sound]
  );

  return (
    <DragAndDropTile
      width={durationToTileWidthMap[sound.duration]}
      onClick={playSound}
      ref={drag}
      isDragging={isDragging}
    >
      {sound.note}
    </DragAndDropTile>
  );
};
