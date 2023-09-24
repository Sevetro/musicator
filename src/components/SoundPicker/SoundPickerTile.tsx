import { FC } from "react";
import { useDrag } from "react-dnd";

import { DragAndDropTypes } from "../../constants/dragAndDropTypes";
import { DragAndDropTile } from "../../styled/DragAndDropTile";
import { Sound } from "../../models/Sound";

interface SoundPickerTileProps {
  sound: Sound;
  playSound: () => void;
}

export const SoundPickerTile: FC<SoundPickerTileProps> = ({
  sound,
  playSound,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragAndDropTypes.PICKER_TILE,
    item: { sound },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <DragAndDropTile onClick={playSound} ref={drag} isDragging={isDragging}>
      {sound.note}
    </DragAndDropTile>
  );
};
