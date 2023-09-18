import { Button, Space } from "antd";
import { FC, useState } from "react";
import styled from "styled-components";

import { SoundTile, SoundTileItem } from "./SoundTile";

interface SoundBoardProps {
  metronomeTicks: number;
}

export const SoundBoard: FC<SoundBoardProps> = ({ metronomeTicks }) => {
  const [notes, setNotes] = useState<string[]>(["A", "B", "C", "D"]);

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

  function handleDrop(item: SoundTileItem, id: number) {
    const newNotes = [...notes];
    newNotes[id] = item.note;
    setNotes(newNotes);
  }

  return (
    <>
      <StyledSpace>
        <Button onClick={handleRemoveNote}>Remove tile</Button>
        <Button onClick={handleAddNote}>Add tile</Button>
      </StyledSpace>

      <StyledSpace>
        {notes.map((note, id) => (
          <SoundTile
            key={id}
            id={id}
            note={note}
            active={id === activeTileId}
            handleDrop={handleDrop}
          />
        ))}
      </StyledSpace>
    </>
  );
};

const StyledSpace = styled(Space)`
  display: flex;
  justify-content: center;
  height: 40px;
`;
