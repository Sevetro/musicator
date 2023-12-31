import { Col, Row } from "antd";
import { FC, useContext } from "react";
import styled from "@emotion/styled";

import { Metronome } from "../metronome";
import { SoundBoard } from "../sound-board";
import { SoundPicker } from "../sound-picker";
import { BoardSelectionManager } from "../board-selection-manager.ts";
import { SoundBoardsContext } from "../../data/sound-boards-context";

export const MainPage: FC = () => {
  const { soundBoardsState } = useContext(SoundBoardsContext);

  return (
    <Container>
      <CentralColumn span={10} offset={7}>
        <Metronome />
        <BoardSelectionManager />

        {soundBoardsState.map((board, id) => (
          <SoundBoard
            key={id}
            boardId={id}
            active={board.active}
            sounds={board.sounds}
          />
        ))}
      </CentralColumn>

      <Col span={7}>
        <SoundPicker />
      </Col>
    </Container>
  );
};

const Container = styled(Row)`
  padding: 10px;
  background-color: #364a54;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
`;

const CentralColumn = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
