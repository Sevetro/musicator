import { DragAndDropTypes } from "../_constants/drag-and-drop-types";
import { Sound } from "../../_models/sound";
import { Values } from "@/lib/types";

export interface DraggableSoundTile {
  id: number;
  sound: Sound;
  type?: Values<typeof DragAndDropTypes>;
}
