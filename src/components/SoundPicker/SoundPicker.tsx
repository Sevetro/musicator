import { Space } from "antd";
import { createScale } from "chords-scales";
import { FC } from "react";

import { SoundPickerTile } from "./SoundPickerTile";
import { useTone } from "../../hooks/useTone";

export const SoundPicker: FC = () => {
  const { playSound } = useTone();

  const notes1 = createScale("C", "ionian", "sharp").map(
    (sound) => sound + "1"
  );
  const notes2 = createScale("C", "ionian", "sharp").map(
    (sound) => sound + "2"
  );
  const notes3 = createScale("C", "ionian", "sharp").map(
    (sound) => sound + "3"
  );
  const notes4 = createScale("C", "ionian", "sharp").map(
    (sound) => sound + "4"
  );
  const notes = notes1.concat(notes2).concat(notes3).concat(notes4);
  const duration = "8n";
  const sounds = notes.map((note) => ({ note, duration }));

  return (
    <Space wrap>
      {sounds.map((sound, id) => (
        <SoundPickerTile
          key={id}
          sound={sound}
          playSound={() => playSound(sound)}
        />
      ))}
    </Space>
  );
};
