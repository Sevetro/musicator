import { FC, useContext } from "react";
import { useDrop } from "react-dnd";
import { TrashIcon } from "@heroicons/react/24/outline";

import { DragAndDropTypes } from "../../_constants/drag-and-drop-types";
import { DraggableSoundTile } from "../../_models/draggable-sound-tile";
import { SoundBoardsContext } from "../../context/sound-boards-context";
import { DragAndDropTile } from "../drag-and-drop-tile";

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
    [handleSoundTileDeletionDrop],
  );

  return (
    <DragAndDropTile
      deletionDropZone
      className="mx-1"
      isOver={isOver}
      ref={drop as any}
    >
      <TrashIcon width={20} height={20} />
    </DragAndDropTile>
  );
};
