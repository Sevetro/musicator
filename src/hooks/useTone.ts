import { Synth } from "tone";
import { useMemo } from "react";

import { Sound } from "../models/Sound";

export const useTone = () => {
  const synth = useMemo(() => new Synth().toDestination(), []);

  function playSound(sound: Sound) {
    if (sound.note !== "") {
      synth.triggerAttackRelease(sound.note, sound.duration);
    }
  }

  return { playSound };
};
