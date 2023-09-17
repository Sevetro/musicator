import { FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";

import { dragAndDropTypes } from "../../constants/dragAndDropTypes";

interface SoundTileProps {
  id: number;
  note: string;
  active: boolean;
  handleDrop: (item: SoundTileItem, id: number) => void;
}

export interface SoundTileItem {
  note: string;
}

const { NOTE_TILE, SOUND_TILE } = dragAndDropTypes;

export const SoundTile: FC<SoundTileProps> = ({
  note,
  id,
  active,
  handleDrop,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: SOUND_TILE,
      item: { note },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),

    [note]
  );

  const [, drop] = useDrop(() => ({
    accept: [SOUND_TILE, NOTE_TILE],
    drop: (item: SoundTileItem) => handleDrop(item, id),
  }));

  return (
    <div ref={drop}>
      {/* <NoteContainer isDragging={isDragging} ref={(node) => drag(drop(node))}> */}
      <NoteContainer isDragging={isDragging} ref={drag}>
        {note}
      </NoteContainer>
    </div>
  );
};

const NoteContainer = styled.div<{ isDragging: boolean }>`
  width: 50px;
  height: 32px;
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
  cursor: pointer;
  border: 1px solid lightgray;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
