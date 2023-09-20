import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface DragAndDropTileProps {
  isDragging?: boolean;
  isActive?: boolean;
  isOver?: boolean;
  small?: boolean;
}

const smallStyles = css`
  width: 30px;
  height: 20px;
`;

export const DragAndDropTile = styled.div<DragAndDropTileProps>`
  width: 50px;
  height: 32px;
  background-color: ${({ isActive }) => (isActive ? "#ffffff" : "#bcd1da")};
  opacity: ${({ isDragging, isOver }) => (isDragging || isOver ? 0.7 : 1)};
  cursor: pointer;
  border: 1px solid lightgray;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ small }) => small && smallStyles}

  &:hover {
    ${({ isActive }) => !isActive && "background-color: #d8e3e9"};
  }
`;
