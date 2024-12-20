import { Values } from "@/_utils/types";
import { DragAndDropTypes } from "../_constants/drag-and-drop-types";
import { Sound } from "../../_models/sound";

export interface DraggableSoundTile {
  id: number;
  sound: Sound;
  type?: Values<typeof DragAndDropTypes>;
}
