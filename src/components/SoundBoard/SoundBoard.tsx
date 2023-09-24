import { Button, Space } from "antd";
import { FC, useContext, useRef } from "react";
import styled from "@emotion/styled";

import { MetronomeContext } from "../../data/MetronomeContext";
import { SoundBoardsContext } from "../../data/SoundBoardsContext";
import { Sound } from "../../models/Sound";
import { useTone } from "../../hooks/useTone";
import { SoundTile } from "./SoundTile";
import { DraggableSoundTile } from "../../models/DraggableSoundTile";

export interface SoundBoardProps {
  boardId: number;
  sounds: Sound[];
  active: boolean;
}

export const SoundBoard: FC<SoundBoardProps> = ({
  boardId,
  active,
  sounds,
}) => {
  const { metronomeTicks, resetMetronome } = useContext(MetronomeContext);
  const { handleSoundTileDrop, addSoundTile, removeSoundTile } =
    useContext(SoundBoardsContext);
  const { playSound } = useTone();

  const soundTilesContainerRef = useRef<HTMLDivElement>(null);

  const activeTileId = metronomeTicks % sounds.length;

  function handleDrop(
    sourceTile: DraggableSoundTile,
    targetTile: DraggableSoundTile
  ) {
    handleSoundTileDrop(boardId, sourceTile, targetTile);
  }

  function handleAddTileClick(id: number) {
    resetMetronome();
    addSoundTile(id);
    setTimeout(() => {
      if (soundTilesContainerRef.current) {
        soundTilesContainerRef.current.scrollTop =
          soundTilesContainerRef.current.scrollHeight;
      }
    });
  }

  function handleRemoveTileClick(tileId: number) {
    resetMetronome();
    removeSoundTile(tileId);
  }

  return (
    <SoundBoardContainer active={active}>
      <ButtonsContainer>
        <Button onClick={() => handleRemoveTileClick(boardId)}>-</Button>
        <Button onClick={() => handleAddTileClick(boardId)}>+</Button>
      </ButtonsContainer>

      <SoundTilesContainer ref={soundTilesContainerRef}>
        <StyledSpace>
          {sounds.map((sound, id) => (
            <SoundTile
              key={id}
              id={id}
              sound={sound}
              active={id === activeTileId}
              handleDrop={handleDrop}
              playSound={() => playSound(sound)}
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
