import { FC, useContext, useEffect, useRef, useState } from "react";

import { SoundTile } from "./sound-tile";
import { DraggableSoundTile } from "../../_models/draggable-sound-tile";
import { SoundTileDeletionDropZone } from "./sound-tile-deletion-drop-zone";
import { useTone } from "../../_hooks/use-tone";
import { Sound } from "@/app/projects/_models/sound";
import { MetronomeContext } from "../../_context/metronome-context";
import { SoundBoardsContext } from "../../_context/sound-boards-context";
import { returnActiveTileId } from "../../_utils/active-sound-tile";

export interface SoundBoardProps {
  boardId: number;
  sounds: Sound[];
  isActive: boolean;
}

export const SoundBoard: FC<SoundBoardProps> = ({
  boardId,
  isActive,
  sounds,
}) => {
  const { metronomeTicks, resetMetronome } = useContext(MetronomeContext);
  const { handleSoundTileDrop, addSoundTile, removeSoundTile } =
    useContext(SoundBoardsContext);
  const { playSound } = useTone();
  const [activeTileId, setActiveTileId] = useState(0);
  const soundTilesContainerRef = useRef<HTMLDivElement>(null);

  const soundDurations = sounds.map((sound) => sound.duration);

  function handleDrop(
    sourceTile: DraggableSoundTile,
    targetTile: DraggableSoundTile,
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
    setActiveTileId(returnActiveTileId(metronomeTicks, soundDurations));
  }, [metronomeTicks, soundDurations]);

  return (
    <div className={`${!isActive && "hidden"}`}>
      <div className="flex justify-center space-x-1">
        <button
          className="btn btn-primary btn-sm w-8"
          onClick={() => handleRemoveTileClick(boardId)}
        >
          -
        </button>
        <SoundTileDeletionDropZone boardId={boardId} />
        <button
          className="btn btn-primary btn-sm w-8"
          onClick={() => handleAddTileClick(boardId)}
        >
          +
        </button>
      </div>

      <div
        ref={soundTilesContainerRef}
        className="mt-2 h-[50vh] overflow-y-auto overflow-x-hidden"
      >
        <div className="flex w-[800px] flex-wrap justify-center">
          {sounds.map((sound, id) => (
            <SoundTile
              key={id}
              id={id}
              sound={sound}
              isActive={id === activeTileId}
              handleDrop={handleDrop}
              playSound={() => playSound(sound)}
              position={returnTilePosition(id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
