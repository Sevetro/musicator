import { DragAndDropTypes } from "../constants/drag-and-drop-types";
import { Values } from "../utils/types";
import { Sound } from "./sound";

export interface DraggableSoundTile {
  id: number;
  sound: Sound;
  type?: Values<typeof DragAndDropTypes>;
}
