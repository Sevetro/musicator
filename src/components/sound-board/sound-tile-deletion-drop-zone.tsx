import { FC, useContext } from "react";
import { useDrop } from "react-dnd";
import { DeleteOutlined } from "@ant-design/icons";

import { DragAndDropTypes } from "../../constants/drag-and-drop-types";
import { DragAndDropTile } from "../../styled/drag-and-drop-tile";
import { SoundBoardsContext } from "../../data/sound-boards-context";
import { DraggableSoundTile } from "../../models/draggable-sound-tile";

const { SOUND_TILE } = DragAndDropTypes;

interface SoundTileDeletionDropZoneProps {
  boardId: number;
}

export const SoundTileDeletionDropZone: FC<SoundTileDeletionDropZoneProps> = ({
  boardId,
}) => {
  const { handleSoundTileDeletionDrop } = useContext(SoundBoardsContext);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: SOUND_TILE,
      drop: (item: DraggableSoundTile) =>
        handleSoundTileDeletionDrop(boardId, item.id),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [handleSoundTileDeletionDrop]
  );

  return (
    <DragAndDropTile isOver={isOver} ref={drop}>
      <DeleteOutlined />
    </DragAndDropTile>
  );
};
