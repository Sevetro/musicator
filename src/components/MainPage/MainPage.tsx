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

const initialSoundBoardsState = [
  ["A", "B", "C", "D"],
  ["E", "F", "G", "A"],
];

const {
  bpm: defaultBpm,
  isActive: defaultIsActive,
  metronomeTicks: defaultMetronomeTicks,
} = defaultMetronomeValues;

export const MainPage: FC = () => {
  const [soundBoardsState, setSoundBoards] = useState(initialSoundBoardsState);
  const {
    bpm,
    setBpm,
    isActive,
    setIsActive,
    metronomeTicks,
    setMetronomeTicks,
    resetMetronome,
  } = useMetronome({ defaultBpm, defaultIsActive, defaultMetronomeTicks });

  function handleDeleteBoard(id: number) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards.splice(id, 1);
    setSoundBoards(newSoundBoards);
  }

  function handleSoundTileDrop(
    soundBoardId: number,
    tileId: number,
    note: string
  ) {
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[soundBoardId][tileId] = note;
    setSoundBoards(newSoundBoards);
  }

  function handleAddSoundTile(soundBoardId: number) {
    resetMetronome();
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[soundBoardId].push("");
    setSoundBoards(newSoundBoards);
  }
  function handleRemoveSoundTile(soundBoardId: number) {
    resetMetronome();
    const newSoundBoards = [...soundBoardsState];
    newSoundBoards[soundBoardId].pop();
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
        <Col span={10} offset={7}>
          <Metronome />
          <BoardSelectionManager
            soundBoardNumbers={soundBoardsState.map((board, id) => id)}
            handleDeleteBoard={handleDeleteBoard}
          />
          {soundBoardsState.map((notes, id) => (
            <SoundBoard
              key={id}
              id={id}
              notes={notes}
              handleTileDrop={handleSoundTileDrop}
              handleRemoveNote={handleRemoveSoundTile}
              handleAddNote={handleAddSoundTile}
            />
          ))}
        </Col>

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
