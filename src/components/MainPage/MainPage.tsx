import { Col, Row } from "antd";
import { FC, useState } from "react";
import styled from "@emotion/styled";

import { Metronome } from "../Metronome";
import { useMetronome } from "../../hooks/useMetronome";
import { SoundBoard } from "../SoundBoard";
import { NotePicker } from "../NotePicker";
import {
  MetronomeContext,
  defaultMetronomeValues,
} from "../../data/MetronomeContext";
import { BoardSelectionManager } from "../BoardSelectionManager";

export interface SoundBoard {
  active: boolean;
  notes: string[];
}

const initialSoundBoardsState: SoundBoard[] = [
  {
    active: true,
    notes: ["A", "B", "C", "D"],
  },
  {
    active: false,
    notes: ["E", "F", "G", "A"],
  },
];

const {
  bpm: defaultBpm,
  isActive: defaultIsActive,
  metronomeTicks: defaultMetronomeTicks,
} = defaultMetronomeValues;

export const MainPage: FC = () => {
  const {
    bpm,
    setBpm,
    isActive,
    setIsActive,
    metronomeTicks,
    setMetronomeTicks,
    resetMetronome,
  } = useMetronome({ defaultBpm, defaultIsActive, defaultMetronomeTicks });
  const [soundBoardsState, setSoundBoards] = useState(initialSoundBoardsState);

  function setActiveBoard(id: number) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards.forEach((board) => (board.active = false));
    newSoundBoards[id].active = true;
    setSoundBoards(newSoundBoards);
  }

  function handleDeleteBoardOnDrop(id: number) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards.splice(id, 1);
    newSoundBoards[0].active = true;
    setSoundBoards(newSoundBoards);
  }

  function handleRemoveBoard() {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards.pop();
    setSoundBoards(newSoundBoards);
  }

  function handleAddBoard() {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards.push({
      active: false,
      notes: [""],
    });
    setSoundBoards(newSoundBoards);
  }

  function handleSoundTileDrop(
    soundBoardId: number,
    tileId: number,
    note: string
  ) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[soundBoardId].notes[tileId] = note;
    setSoundBoards(newSoundBoards);
  }

  function handleAddSoundTile(soundBoardId: number) {
    resetMetronome();
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[soundBoardId].notes.push("");
    setSoundBoards(newSoundBoards);
  }

  function handleRemoveSoundTile(soundBoardId: number) {
    resetMetronome();
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[soundBoardId].notes.pop();
    setSoundBoards(newSoundBoards);
  }

  return (
    <MetronomeContext.Provider
      value={{
        bpm,
        setBpm,
        isActive,
        setIsActive,
        metronomeTicks,
        setMetronomeTicks,
        resetMetronome,
      }}
    >
      <Container>
        <CentralColumn span={10} offset={7}>
          <Metronome />
          <BoardSelectionManager
            soundBoards={soundBoardsState.map((board) => ({
              active: board.active,
            }))}
            handleDeleteBoardOnDrop={handleDeleteBoardOnDrop}
            handleRemoveBoard={handleRemoveBoard}
            handleAddBoard={handleAddBoard}
            setActiveBoard={setActiveBoard}
          />

          {soundBoardsState.map((board, id) => (
            <SoundBoard
              key={id}
              id={id}
              active={board.active}
              notes={board.notes}
              handleTileDrop={handleSoundTileDrop}
              handleRemoveNote={handleRemoveSoundTile}
              handleAddNote={handleAddSoundTile}
            />
          ))}
        </CentralColumn>

        <Col span={7}>
          <NotePicker />
        </Col>
      </Container>
    </MetronomeContext.Provider>
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
