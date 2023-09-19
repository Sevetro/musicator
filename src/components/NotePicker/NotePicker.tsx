import { Space } from "antd";
import { createScale } from "chords-scales";
import { FC } from "react";

import { NoteTile } from "./NoteTile";

export const NotePicker: FC = () => {
  const notes = createScale("C", "ionian", "sharp");

  return (
    <Space wrap>
      {notes.map((note, id) => (
        <NoteTile key={id} note={note} />
      ))}
    </Space>
  );
};
