import { createContext } from "react";

import { MetronomeProps } from "../hooks/useMetronome";

export const defaultMetronomeValues: MetronomeProps = {
  bpm: 60,
  setBpm: () => null,
  isActive: false,
  setIsActive: () => null,
  metronomeTicks: 0,
  setMetronomeTicks: () => null,
};

export const MetronomeContext = createContext(defaultMetronomeValues);
