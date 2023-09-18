import { Button, Space } from "antd";
import { FC, useContext, useState } from "react";
import styled from "styled-components";

import { SoundTile, SoundTileItem } from "./SoundTile";
import { MetronomeContext } from "../../data/MetronomeContext";

export const SoundBoard: FC = () => {
  const [notes, setNotes] = useState<string[]>(["A", "B", "C", "D"]);
  const { metronomeTicks } = useContext(MetronomeContext);

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
        <Button onClick={handleRemoveNote}>-</Button>
        <Button onClick={handleAddNote}>+</Button>
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
  margin: auto;
  height: 40px;
  width: 470px;
  flex-wrap: wrap;
`;
