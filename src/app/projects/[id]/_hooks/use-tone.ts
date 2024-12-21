import { Synth, SynthOptions } from "tone";
import { useContext, useEffect, useState } from "react";

import { MetronomeContext } from "../_context/metronome-context";
import { Sound } from "../../_models/sound";
import { metronomeStep } from "../_constants/metronome-step";

export const useTone = () => {
  const { bpm } = useContext(MetronomeContext);
  const [synth, setSynth] = useState<Synth<SynthOptions>>();

  function playSound(sound: Sound) {
    if (sound.note !== "") {
      synth &&
        synth.triggerAttackRelease(
          sound.note,
          (sound.duration * 60 * metronomeStep) / bpm,
        );
    }
  }

  useEffect(() => {
    setSynth(new Synth().toDestination());
  }, []);

  return { playSound };
};
