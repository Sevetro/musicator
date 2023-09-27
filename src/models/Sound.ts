import { Frequency } from "tone/build/esm/core/type/Units";

import {
  MusicalNoteOctaves,
  MusicalNotes,
  SoundDurations,
} from "../constants/Sound";
import { Values } from "../utils/types";

export type MusicalNote = Values<typeof MusicalNotes>;

export type MusicalNoteOctave = Values<typeof MusicalNoteOctaves>;

export type SoundDuration = Values<typeof SoundDurations>;

export interface Sound {
  note: Frequency;
  duration: SoundDuration;
}
