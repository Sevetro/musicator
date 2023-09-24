import { Frequency, Time } from "tone/build/esm/core/type/Units";

export interface Sound {
  note: Frequency;
  duration: Time;
}
