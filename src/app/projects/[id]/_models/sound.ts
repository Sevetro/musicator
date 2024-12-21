import { ArrayElement } from "@/lib/types";
import { MusicalNotes, Octaves } from "../_constants/sound";

export type MusicalNote = ArrayElement<typeof MusicalNotes>;

export type Octave = ArrayElement<typeof Octaves>;
