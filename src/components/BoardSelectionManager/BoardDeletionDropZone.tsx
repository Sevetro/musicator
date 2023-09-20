import { FC } from "react";
import { useDrop } from "react-dnd";
import styled from "@emotion/styled";

import { dragAndDropTypes } from "../../constants/dragAndDropTypes";
import { BoardSelectionTileItem } from "./BoardSelectionTile";
import { DragAndDropTile } from "../../styled/DragAndDropTile";

interface BoardSelectionTileProps {
  handleDrop: (item: BoardSelectionTileItem) => void;
}

const { BOARD_TILE } = dragAndDropTypes;

export const BoardDeletionDropZone: FC<BoardSelectionTileProps> = ({
  handleDrop,
}) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: BOARD_TILE,
      drop: (item: BoardSelectionTileItem) => handleDrop(item),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [handleDrop]
  );

  return <StyledTile small isOver={isOver} ref={drop} />;
};

const StyledTile = styled(DragAndDropTile)`
  background-color: red;

  &:hover {
    background-color: red;
    cursor: default;
  }
`;
