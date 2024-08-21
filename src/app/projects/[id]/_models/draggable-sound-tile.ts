import { Values } from "@/_utils/types";
import { Sound } from "./sound";
import { DragAndDropTypes } from "../_constants/drag-and-drop-types";

export interface DraggableSoundTile {
  id: number;
  sound: Sound;
  type?: Values<typeof DragAndDropTypes>;
}
