import { Col, Row } from "antd";
import { FC, useContext } from "react";
import styled from "@emotion/styled";

import { Metronome } from "../Metronome";
import { SoundBoard } from "../SoundBoard";
import { NotePicker } from "../NotePicker";
import { BoardSelectionManager } from "../BoardSelectionManager";
import { SoundBoardsContext } from "../../data/SoundBoardsContext";

export const MainPage: FC = () => {
  const { soundBoardsState } = useContext(SoundBoardsContext);

  return (
    <Container>
      <CentralColumn span={10} offset={7}>
        <Metronome />
        <BoardSelectionManager
          soundBoards={soundBoardsState.map((board) => ({
            active: board.active,
          }))}
        />

        {soundBoardsState.map((board, id) => (
          <SoundBoard
            key={id}
            id={id}
            active={board.active}
            notes={board.notes}
          />
        ))}
      </CentralColumn>

      <Col span={7}>
        <NotePicker />
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
