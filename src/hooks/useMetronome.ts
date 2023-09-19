import { useState } from "react";
import { useInterval } from "react-use";

const ONE_MINUTE_IN_SECONDS = 60 * 1000;

interface UseMetronomeProps {
  defaultBpm: number;
  defaultIsActive: boolean;
  defaultMetronomeTicks: number;
}

export const useMetronome = ({
  defaultBpm,
  defaultIsActive,
  defaultMetronomeTicks,
}: UseMetronomeProps) => {
  const [bpm, setBpm] = useState(defaultBpm);
  const [isActive, setIsActive] = useState(defaultIsActive);
  const [metronomeTicks, setMetronomeTicks] = useState(defaultMetronomeTicks);

  function resetMetronome() {
    setIsActive(false);
    setMetronomeTicks(0);
  }

  useInterval(() => {
    if (isActive) {
      setMetronomeTicks(metronomeTicks + 1);
    }
  }, ONE_MINUTE_IN_SECONDS / bpm);

  return {
    bpm,
    setBpm,
    isActive,
    setIsActive,
    metronomeTicks,
    setMetronomeTicks,
    resetMetronome,
  };
};

export type MetronomeProps = ReturnType<typeof useMetronome>;
