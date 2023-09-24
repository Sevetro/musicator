import { FC, useContext } from "react";
import { useDrop } from "react-dnd";
import { DeleteOutlined } from "@ant-design/icons";

import { DragAndDropTypes } from "../../constants/dragAndDropTypes";
import { DragAndDropTile } from "../../styled/DragAndDropTile";
import { SoundBoardsContext } from "../../data/SoundBoardsContext";
import { DraggableSoundTile } from "../../models/DraggableSoundTile";

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
    <DragAndDropTile deletionDropZone isOver={isOver} ref={drop}>
      <DeleteOutlined />
    </DragAndDropTile>
  );
};
