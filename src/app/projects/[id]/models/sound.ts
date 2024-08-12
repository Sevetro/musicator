import { Frequency } from "tone/build/esm/core/type/Units";

import { MusicalNotes, Octaves, SoundDurations } from "../constants/sound";
import { ArrayElement } from "@/utils/types";

export type MusicalNote = ArrayElement<typeof MusicalNotes>;

export type Octave = ArrayElement<typeof Octaves>;

export type SoundDuration = ArrayElement<typeof SoundDurations>;

export interface Sound {
  note: Frequency; //TODO: change to MusicalNote
  duration: SoundDuration;
}
