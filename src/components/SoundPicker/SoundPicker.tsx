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

const selectNoteOctaveOption: DefaultOptionType[] = MusicalNoteOctaves.map(
  (octave) => ({
    label: octave,
    value: octave,
  })
);

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
  const [octave, setOctave] = useState<MusicalNoteOctave>(0);
  const [duration, setDuration] = useState<number>(3);

  const sound: Sound = {
    note: `${note}${octave}`,
    duration: sliderDurationMap[duration],
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

      <Slider
        css={sliderStyles}
        value={duration}
        onChange={setDuration}
        min={1}
        max={5}
      />

      <SoundPickerTile sound={sound} playSound={() => playSound(sound)} />
    </Space>
  );
};

const selectStyles = css`
  width: 60px;
`;

const sliderStyles = css`
  width: 215px;
`;
