import { Space } from "antd";
import { FC } from "react";

import {
  BoardSelectionTile,
  BoardSelectionTileItem,
} from "./BoardSelectionTile";
import { BoardDeletionDropZone } from "./BoardDeletionDropZone";
import styled from "styled-components";

interface BoardSelectionManagerProps {
  soundBoardNumbers: number[];
  handleDeleteBoard: (id: number) => void;
}

export const BoardSelectionManager: FC<BoardSelectionManagerProps> = ({
  soundBoardNumbers,
  handleDeleteBoard,
}) => {
  function handleDrop(item: BoardSelectionTileItem) {
    handleDeleteBoard(item.id);
  }

  return (
    <StyledSpace>
      {soundBoardNumbers.map((boardNumber) => (
        <BoardSelectionTile key={boardNumber} id={boardNumber} />
      ))}

      <BoardDeletionDropZone handleDrop={handleDrop} />
    </StyledSpace>
  );
};

const StyledSpace = styled(Space)`
  border: 1px solid black;
`;
