import styled from "styled-components";

interface NoteContainerProps {
  isDragging: boolean;
  isActive?: boolean;
  isOver?: boolean;
}

export const NoteContainer = styled.div<NoteContainerProps>`
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

  &:hover {
    ${({ isActive }) => !isActive && "background-color: #d8e3e9"};
  }
`;
