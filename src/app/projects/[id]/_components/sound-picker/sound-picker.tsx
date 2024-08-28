import { useContext, useEffect, useState } from "react";

import { SoundPickerTile } from "./sound-picker-tile";
import { useTone } from "../../_hooks/use-tone";
import { MusicalNote, Octave } from "../../_models/sound";
import { MusicalNotes, Octaves } from "../../_constants/sound";
import { Sound, SoundDuration } from "@/app/projects/_models/sound";
import { SoundDurations } from "@/app/projects/_constants/sound";
import { MetronomeContext } from "../../_context/metronome-context";
import { SoundBoardsContext } from "../../_context/sound-boards-context";
import { returnActiveTileId } from "../../_utils/active-sound-tile";

const durationToNoteMap: Record<SoundDuration, string> = {
  2: "32t",
  3: "32",
  4: "16t",
  6: "16",
  8: "8t",
  12: "8",
  16: "4t",
  24: "4",
  32: "2t",
  48: "2",
  64: "1t",
  96: "1",
};

export const SoundPicker = () => {
  const { metronomeTicks, metronomeActive } = useContext(MetronomeContext);
  const { soundBoardsState, activeSoundBoardId } =
    useContext(SoundBoardsContext);
  const { playSound } = useTone();
  const [note, setNote] = useState<MusicalNote | "">("");
  const [octave, setOctave] = useState<Octave>(3);
  const [duration, setDuration] = useState<SoundDuration>(24);

  const sound: Sound = {
    note: note === "" ? "" : `${note}${octave}`,
    duration,
  };

  useEffect(() => {
    if (soundBoardsState.length === 0) return;
    if (!metronomeActive) {
      const activeSoundBoard = soundBoardsState[activeSoundBoardId];
      const sounds = activeSoundBoard?.sounds;
      const soundDurations = activeSoundBoard?.sounds?.map(
        (sound) => sound.duration,
      );
      const activeTileId = returnActiveTileId(metronomeTicks, soundDurations);

      const octave = sounds[activeTileId].note.toString().match(/\d+/)?.[0];
      const note = sounds[activeTileId].note.toString().match(/\D+/)?.[0];
      const duration = sounds[activeTileId].duration;

      if (octave === undefined || note === undefined) {
        setNote("");
      } else {
        setOctave(Number(octave) as Octave);
        setNote(note as MusicalNote);
      }
      setDuration(duration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metronomeActive, metronomeTicks]);

  return (
    <div className="flex w-full flex-col items-center">
      <div>
        <select
          className="select select-primary select-sm"
          value={note}
          onChange={(e) => setNote(e.target.value as MusicalNote)}
        >
          <option value={""}>-</option>
          {MusicalNotes.map((note) => (
            <option key={note}>{note}</option>
          ))}
        </select>
        {note !== "" && (
          <select
            className="select select-primary select-sm mx-[2px]"
            value={octave}
            onChange={(e) => setOctave(Number(e.target.value) as Octave)}
          >
            {Octaves.map((octave) => (
              <option key={octave}>{octave}</option>
            ))}
          </select>
        )}
        <select
          className="select select-primary select-sm"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value) as SoundDuration)}
        >
          {SoundDurations.map((duration) => (
            <option key={duration} value={duration}>
              {durationToNoteMap[duration]}
            </option>
          ))}
        </select>
      </div>

      <SoundPickerTile sound={sound} playSound={() => playSound(sound)} />
    </div>
  );
};
