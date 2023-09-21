import { Button, Space } from "antd";
import { FC, useContext } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import {
  BoardSelectionTile,
  BoardSelectionTileItem,
} from "./BoardSelectionTile";
import { BoardDeletionDropZone } from "./BoardDeletionDropZone";
import { SoundBoardsContext } from "../../data/SoundBoardsContext";
import { SoundBoardProps } from "../SoundBoard/SoundBoard";

interface BoardSelectionManagerProps {
  soundBoards: Pick<SoundBoardProps, "active">[];
}

export const BoardSelectionManager: FC<BoardSelectionManagerProps> = ({
  soundBoards,
}) => {
  const {
    handleDeleteBoardOnDrop,
    handleRemoveBoard,
    handleAddBoard,
    setActiveBoard,
  } = useContext(SoundBoardsContext);

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
  margin-bottom: -1px;
  flex-direction: column;
  border: 2px solid lightblue;
  border-radius: 10px;
`;

const buttonStyles = css`
  width: 30px;
`;
