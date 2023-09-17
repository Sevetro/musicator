import { FC } from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";

import { dragAndDropTypes } from "../../constants/dragAndDropTypes";

interface NoteTileProps {
  note: string;
}

export const NoteTile: FC<NoteTileProps> = ({ note }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: dragAndDropTypes.NOTE_TILE,
    item: { note },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <NoteContainer ref={drag} isDragging={isDragging}>
      {note}
    </NoteContainer>
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
