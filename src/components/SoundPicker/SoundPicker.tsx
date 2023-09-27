import { Select, Slider, Space } from "antd";
import { FC, useState } from "react";
import { DefaultOptionType } from "antd/es/select";
import { css } from "@emotion/react";

import { SoundPickerTile } from "./SoundPickerTile";
import { useTone } from "../../hooks/useTone";
import {
  MusicalNote,
  MusicalNoteOctave,
  Sound,
  SoundDuration,
} from "../../models/Sound";
import { MusicalNoteOctaves, MusicalNotes } from "../../constants/Sound";

const selectNoteOption: DefaultOptionType[] = Object.values(MusicalNotes).map(
  (note) => ({
    label: note,
    value: note,
  })
);

const selectNoteOctaveOption: DefaultOptionType[] = Object.values(
  MusicalNoteOctaves
).map((octave) => ({
  label: octave,
  value: octave,
}));

const durationMap: Record<number, SoundDuration> = {
  1: "16n",
  2: "8n",
  3: "4n",
  4: "2n",
  5: "1n",
};

export const SoundPicker: FC = () => {
  const { playSound } = useTone();
  const [note, setNote] = useState<MusicalNote>("A");
  const [octave, setOctave] = useState<MusicalNoteOctave>(0);
  const [duration, setDuration] = useState<number>(3);

  const sound: Sound = {
    note: `${note}${octave}`,
    duration: durationMap[duration],
  };

  return (
    <Space direction="vertical">
      <Space>
        <Select
          value={note}
          onChange={setNote}
          options={selectNoteOption}
          css={selectStyles}
        />
        <Select
          value={octave}
          onChange={setOctave}
          options={selectNoteOctaveOption}
          css={selectStyles}
        />
      </Space>

      <Slider value={duration} onChange={setDuration} min={1} max={5} />

      <SoundPickerTile sound={sound} playSound={() => playSound(sound)} />
    </Space>
  );
};

const selectStyles = css`
  width: 60px;
`;
