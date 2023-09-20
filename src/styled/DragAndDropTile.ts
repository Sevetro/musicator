import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface DragAndDropTileProps {
  isDragging?: boolean;
  active?: boolean;
  isOver?: boolean;
  small?: boolean;
  deletionDropZone?: boolean;
}

const smallStyles = css`
  width: 30px;
  height: 23px;
`;

const deletionDropZoneStyles = css`
  cursor: default;
  background-color: red;
  &:hover {
    background-color: red;
  }
`;

export const DragAndDropTile = styled.div<DragAndDropTileProps>`
  width: 50px;
  height: 32px;
  background-color: ${({ active }) => (active ? "#ffffff" : "#bcd1da")};
  opacity: ${({ isDragging, isOver }) => (isDragging || isOver ? 0.7 : 1)};
  cursor: pointer;
  border: 1px solid lightgray;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    ${({ active }) => !active && "background-color: #d8e3e9"};
  }

  ${({ small }) => small && smallStyles}
  ${({ deletionDropZone }) => deletionDropZone && deletionDropZoneStyles}
`;
