import { Button, Space } from "antd";
import { FC, useContext } from "react";
import styled from "styled-components";

import { SoundTile, SoundTileItem } from "./SoundTile";
import { MetronomeContext } from "../../data/MetronomeContext";

export interface SoundBoardProps {
  id: number;
  notes: string[];
  handleTileDrop: (soundBoardId: number, tileId: number, note: string) => void;
  handleRemoveNote: (soundBoardId: number) => void;
  handleAddNote: (soundBoardId: number) => void;
}

export const SoundBoard: FC<SoundBoardProps> = ({
  id,
  notes,
  handleTileDrop,
  handleRemoveNote,
  handleAddNote,
}) => {
  const { metronomeTicks } = useContext(MetronomeContext);

  const activeTileId = metronomeTicks % notes.length;

  function handleDrop(item: SoundTileItem, tileId: number) {
    handleTileDrop(id, tileId, item.note);
  }

  return (
    <>
      <StyledSpace>
        <Button onClick={() => handleRemoveNote(id)}>-</Button>
        <Button onClick={() => handleAddNote(id)}>+</Button>
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
