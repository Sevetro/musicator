import { Button, Space } from "antd";
import { FC, useContext, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import { MetronomeContext } from "../../data/metronome-context";
import { SoundBoardsContext } from "../../data/sound-boards-context";
import { Sound } from "../../models/sound";
import { useTone } from "../../hooks/use-tone";
import { SoundTile } from "./sound-tile";
import { DraggableSoundTile } from "../../models/draggable-sound-tile";
import { SoundTileDeletionDropZone } from "./sound-tile-deletion-drop-zone";

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
  const [activeTileId, setActiveTileId] = useState(0);
  const soundTilesContainerRef = useRef<HTMLDivElement>(null);

  const soundDurations = sounds.map((sound) => sound.duration);

  const boardDuration = soundDurations.reduce((acc, curr) => acc + curr, 0);

  function returnActiveTileId() {
    let tileId = 0;
    let durationsSum = 0;
    const metronomePosition = metronomeTicks % boardDuration;

    while (tileId < sounds.length) {
      durationsSum = durationsSum + soundDurations[tileId];
      if (durationsSum < metronomePosition + 1) {
        tileId++;
      } else break;
    }

    return tileId;
  }

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

  function returnTilePosition(tileId: number) {
    return soundDurations.slice(0, tileId).reduce((acc, curr) => acc + curr, 0);
  }

  useEffect(() => {
    setActiveTileId(returnActiveTileId());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metronomeTicks]);

  return (
    <SoundBoardContainer active={active}>
      <ButtonsContainer>
        <Button onClick={() => handleRemoveTileClick(boardId)}>-</Button>
        <SoundTileDeletionDropZone boardId={boardId} />
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
              position={returnTilePosition(id)}
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
