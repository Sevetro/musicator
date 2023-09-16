import { Button } from "antd";
import { FC } from "react";

interface SoundTileProps {
  note: string;
  active: boolean;
}

export const SoundTile: FC<SoundTileProps> = ({ note, active }) => {
  return <Button color={active ? "red" : "blue"}>{note}</Button>;
};
