import { Button, Col, Space } from "antd";
import { FC, useState } from "react";
import styled from "styled-components";

import { SoundTile } from "./SoundTile";

interface SoundBoardProps {
  metronomeTicks: number;
}

export const SoundBoard: FC<SoundBoardProps> = ({ metronomeTicks }) => {
  const [notes, setNotes] = useState(["A", "B", "C"]);

  const activeTileId = metronomeTicks % notes.length;

  function handleAddNote() {
    const newNotes = [...notes];
    newNotes.push("");
    setNotes(newNotes);
  }
  function handleRemoveNote() {
    const newNotes = [...notes];
    newNotes.pop();
    setNotes(newNotes);
  }

  return (
    <>
      <Col span={24}>
        <StyledSpace>
          <Button onClick={handleRemoveNote}>Remove tile</Button>
          <Button onClick={handleAddNote}>Add tile</Button>
        </StyledSpace>
      </Col>

      <Col span={24}>
        <StyledSpace>
          {notes.map((note, id) => (
            <SoundTile key={id} note={note} active={id === activeTileId} />
          ))}
        </StyledSpace>
      </Col>
    </>
  );
};

const StyledSpace = styled(Space)`
  display: flex;
  justify-content: center;
`;
