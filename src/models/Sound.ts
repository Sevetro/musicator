import { Frequency } from "tone/build/esm/core/type/Units";

import { Values } from "../utils/types";
import { MusicalNotes } from "../constants/sound";

export type MusicalNote = Values<typeof MusicalNotes>;

export type MusicalNoteOctave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type SoundDuration = 0.25 | 0.5 | 1 | 2 | 4;

export interface Sound {
  note: Frequency;
  duration: SoundDuration;
}
