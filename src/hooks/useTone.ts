import { Synth } from "tone";
import { useContext, useMemo } from "react";

import { Sound } from "../models/Sound";
import { MetronomeContext } from "../data/MetronomeContext";

export const useTone = () => {
  const { bpm } = useContext(MetronomeContext);
  const synth = useMemo(() => new Synth().toDestination(), []);

  function playSound(sound: Sound) {
    if (sound.note !== "") {
      synth.triggerAttackRelease(sound.note, (sound.duration * 60) / bpm);
    }
  }

  return { playSound };
};
