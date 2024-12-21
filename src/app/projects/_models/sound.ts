import { Frequency } from "tone/build/esm/core/type/Units";

import { SoundDurations } from "../_constants/sound";
import { ArrayElement } from "@/lib/types";

export type SoundDuration = ArrayElement<typeof SoundDurations>;

export interface Sound {
  note: Frequency; //TODO: change to MusicalNote
  duration: SoundDuration;
}
