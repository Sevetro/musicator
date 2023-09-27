import { FC } from "react";
import { useDrag } from "react-dnd";

import { DragAndDropTypes } from "../../constants/DragAndDropTypes";
import { DragAndDropTile } from "../../styled/DragAndDropTile";
import { Sound } from "../../models/Sound";
import { durationToTileWidthMap } from "../../utils/soundTile";

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
