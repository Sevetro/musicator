import { FC, useState } from "react";

import { SoundPickerTile } from "./sound-picker-tile";
import { useTone } from "../../hooks/use-tone";
import { MusicalNote, Octave, Sound, SoundDuration } from "../../models/sound";
import { MusicalNotes, Octaves } from "../../constants/sound";

const sliderDurationMap: Record<number, SoundDuration> = {
  1: 0.25,
  2: 0.5,
  3: 1,
  4: 2,
  5: 4,
};

export const SoundPicker: FC = () => {
  const { playSound } = useTone();
  const [note, setNote] = useState<MusicalNote>("A");
  const [octave, setOctave] = useState<Octave>(0);
  const [sliderValue, setSliderValue] = useState<number>(3);

  const sound: Sound = {
    note: `${note}${octave}`,
    duration: sliderDurationMap[sliderValue],
  };

  return (
    <div>
      <div>
        <select
          className="select"
          value={note}
          onChange={(e) => setNote(e.target.value as MusicalNote)}
        >
          {MusicalNotes.map((note) => (
            <option key={note}>{note}</option>
          ))}
        </select>
        <select
          className="select"
          value={octave}
          onChange={(e) => setOctave(Number(e.target.value) as Octave)}
        >
          {Octaves.map((octave) => (
            <option key={octave}>{octave}</option>
          ))}
        </select>
      </div>

      {/* <SoundDurationSlider value={sliderValue} setDuration={setSliderValue} /> */}

      <SoundPickerTile sound={sound} playSound={() => playSound(sound)} />
    </div>
  );
};
