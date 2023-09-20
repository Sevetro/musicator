import { Button, Space } from "antd";
import { FC } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import {
  BoardSelectionTile,
  BoardSelectionTileItem,
} from "./BoardSelectionTile";
import { BoardDeletionDropZone } from "./BoardDeletionDropZone";
import { SoundBoard } from "../MainPage/MainPage";

interface BoardSelectionManagerProps {
  soundBoards: Pick<SoundBoard, "active">[];
  handleDeleteBoardOnDrop: (id: number) => void;
  handleRemoveBoard: () => void;
  handleAddBoard: () => void;
  setActiveBoard: (id: number) => void;
}

export const BoardSelectionManager: FC<BoardSelectionManagerProps> = ({
  soundBoards,
  handleDeleteBoardOnDrop,
  handleRemoveBoard,
  handleAddBoard,
  setActiveBoard,
}) => {
  function handleDrop(item: BoardSelectionTileItem) {
    handleDeleteBoardOnDrop(item.id);
  }

  return (
    <BoardManagerContainer>
      <Space>
        <Button
          icon={<MinusOutlined />}
          css={buttonStyles}
          size="small"
          onClick={handleRemoveBoard}
        />
        <BoardDeletionDropZone handleDrop={handleDrop} />
        <Button
          icon={<PlusOutlined />}
          css={buttonStyles}
          size="small"
          onClick={handleAddBoard}
        />
      </Space>

      <Space>
        {soundBoards.map((board, id) => (
          <BoardSelectionTile
            key={id}
            id={id}
            active={board.active}
            setActiveBoard={setActiveBoard}
          />
        ))}
      </Space>
    </BoardManagerContainer>
  );
};

const BoardManagerContainer = styled(Space)`
  padding: 5px;
  margin-top: 20px;
  margin-bottom: 1px;
  flex-direction: column;
  border: 2px solid lightslategray;
  border-radius: 10px;
`;

const buttonStyles = css`
  width: 30px;
`;
