import { useState } from "react";
import { useInterval } from "react-use";

const ONE_MINUTE_IN_SECONDS = 60 * 1000;

export const useMetronome = () => {
  const [bpm, setBpm] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [metronomeTicks, setMetronomeTicks] = useState(0);

  useInterval(() => {
    if (isActive) {
      setMetronomeTicks(metronomeTicks + 1);
    }
  }, ONE_MINUTE_IN_SECONDS / bpm);

  return { bpm, setBpm, isActive, setIsActive, metronomeTicks };
};
