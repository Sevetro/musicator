import { MusicalNotes, Octaves } from "../_constants/sound";
import { ArrayElement } from "@/_utils/types";

export type MusicalNote = ArrayElement<typeof MusicalNotes>;

export type Octave = ArrayElement<typeof Octaves>;
