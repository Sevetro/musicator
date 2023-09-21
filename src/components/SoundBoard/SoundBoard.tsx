import { Button, Space } from "antd";
import { FC, useContext, useRef } from "react";
import styled from "@emotion/styled";

import { SoundTile, SoundTileItem } from "./SoundTile";
import { MetronomeContext } from "../../data/MetronomeContext";

export interface SoundBoardProps {
  id: number;
  notes: string[];
  active: boolean;
  handleTileDrop: (soundBoardId: number, tileId: number, note: string) => void;
  handleRemoveNote: (soundBoardId: number) => void;
  handleAddNote: (soundBoardId: number) => void;
}

export const SoundBoard: FC<SoundBoardProps> = ({
  id,
  active,
  notes,
  handleTileDrop,
  handleRemoveNote,
  handleAddNote,
}) => {
  const { metronomeTicks } = useContext(MetronomeContext);
  const soundTilesContainerRef = useRef<HTMLDivElement>(null);

  const activeTileId = metronomeTicks % notes.length;

  function handleDrop(item: SoundTileItem, tileId: number) {
    handleTileDrop(id, tileId, item.note);
  }

  function addNote(id: number) {
    handleAddNote(id);
    setTimeout(() => {
      if (soundTilesContainerRef.current) {
        soundTilesContainerRef.current.scrollTop =
          soundTilesContainerRef.current.scrollHeight;
      }
    });
  }

  return (
    <SoundBoardContainer active={active}>
      <ButtonsContainer>
        <Button onClick={() => handleRemoveNote(id)}>-</Button>
        <Button onClick={() => addNote(id)}>+</Button>
      </ButtonsContainer>

      <SoundTilesContainer ref={soundTilesContainerRef}>
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
      </SoundTilesContainer>
    </SoundBoardContainer>
  );
};

const SoundTilesContainer = styled.div`
  height: 50vh;
  overflow-y: auto;
  overflow-x: hidden;

  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const SoundBoardContainer = styled.div<{ active: boolean }>`
  border: 2px solid lightblue;
  border-radius: 10px;

  ${({ active }) => !active && "display: none"};
`;

const StyledSpace = styled(Space)`
  display: flex;
  justify-content: center;
  height: 40px;
  width: 470px;
  flex-wrap: wrap;
`;

const ButtonsContainer = styled(Space)`
  display: flex;
  justify-content: center;
  height: 40px;
`;
