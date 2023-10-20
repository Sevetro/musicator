import { Button, Space } from "antd";
import { FC, useContext } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import { BoardSelectionTile } from "./board-selection-tile";
import { BoardDeletionDropZone } from "./board-deletion-drop-zone";
import { SoundBoardsContext } from "../../data/sound-boards-context";

export const BoardSelectionManager: FC = () => {
  const { soundBoardsState, removeSoundBoard, addSoundBoard } =
    useContext(SoundBoardsContext);

  const boardsActiveProps = soundBoardsState.map((board) => board.active);

  return (
    <BoardManagerContainer>
      <Space>
        <Button
          icon={<MinusOutlined />}
          css={buttonStyles}
          size="small"
          onClick={removeSoundBoard}
        />
        <BoardDeletionDropZone />
        <Button
          icon={<PlusOutlined />}
          css={buttonStyles}
          size="small"
          onClick={addSoundBoard}
        />
      </Space>

      <Space>
        {boardsActiveProps.map((active, id) => (
          <BoardSelectionTile key={id} id={id} active={active} />
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
