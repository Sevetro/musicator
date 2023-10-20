import { Synth } from "tone";
import { useContext, useMemo } from "react";

import { Sound } from "../models/sound";
import { MetronomeContext } from "../data/metronome-context";

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
