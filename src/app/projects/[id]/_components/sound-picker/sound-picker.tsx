import { useState } from "react";

import { SoundPickerTile } from "./sound-picker-tile";
import { useTone } from "../../_hooks/use-tone";
import { MusicalNote, Octave } from "../../_models/sound";
import { MusicalNotes, Octaves } from "../../_constants/sound";
import { Sound, SoundDuration } from "@/app/projects/_models/sound";
import { SoundDurations } from "@/app/projects/_constants/sound";

const durationToNoteMap = {
  0.25: "1/16",
  0.5: "1/8",
  1: "1/4",
  2: "1/2",
  4: "1",
};

export const SoundPicker = () => {
  const { playSound } = useTone();
  const [note, setNote] = useState<MusicalNote>("A");
  const [octave, setOctave] = useState<Octave>(0);
  const [duration, setDuration] = useState<SoundDuration>(1);

  const sound: Sound = {
    note: `${note}${octave}`,
    duration,
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div>
        <select
          className="select select-sm"
          value={note}
          onChange={(e) => setNote(e.target.value as MusicalNote)}
        >
          {MusicalNotes.map((note) => (
            <option key={note}>{note}</option>
          ))}
        </select>
        <select
          className="select select-sm mx-[2px]"
          value={octave}
          onChange={(e) => setOctave(Number(e.target.value) as Octave)}
        >
          {Octaves.map((octave) => (
            <option key={octave}>{octave}</option>
          ))}
        </select>
        <select
          className="select select-sm"
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
