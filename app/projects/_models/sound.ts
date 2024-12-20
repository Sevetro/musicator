import { Frequency } from "tone/build/esm/core/type/Units";

import { ArrayElement } from "@/_utils/types";
import { SoundDurations } from "../_constants/sound";

export type SoundDuration = ArrayElement<typeof SoundDurations>;

export interface Sound {
  note: Frequency; //TODO: change to MusicalNote
  duration: SoundDuration;
}
