import { DragAndDropTypes } from "../constants/dragAndDropTypes";
import { Values } from "../utils/types";
import { Sound } from "./Sound";

export interface DraggableSoundTile {
  id: number;
  sound: Sound;
  type?: Values<typeof DragAndDropTypes>;
}
