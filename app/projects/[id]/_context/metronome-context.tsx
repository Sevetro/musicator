import { Dispatch } from "react";
import { FC, PropsWithChildren, createContext, useState } from "react";
import { useInterval } from "react-use";

import { metronomeStep } from "../_constants/metronome-step";

const ONE_MINUTE_IN_MILISECONDS = 60 * 1000;

interface MetronomeContext {
  bpm: number;
  setBpm: Dispatch<React.SetStateAction<number>>;
  metronomeActive: boolean;
  setMetronomeActive: Dispatch<React.SetStateAction<boolean>>;
  metronomeTicks: number;
  setMetronomeTicks: Dispatch<React.SetStateAction<number>>;
  resetMetronome: () => void;
}

const defaultMetronomeContextValues = {
  bpm: 120,
  setBpm: () => null,
  metronomeActive: false,
  setMetronomeActive: () => null,
  metronomeTicks: 0,
  setMetronomeTicks: () => null,
  resetMetronome: () => null,
};

export const MetronomeContext = createContext<MetronomeContext>(
  defaultMetronomeContextValues,
);

export const MetronomeContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [bpm, setBpm] = useState(defaultMetronomeContextValues.bpm);
  const [metronomeActive, setMetronomeActive] = useState(
    defaultMetronomeContextValues.metronomeActive,
  );
  const [metronomeTicks, setMetronomeTicks] = useState(
    defaultMetronomeContextValues.metronomeTicks,
  );

  function resetMetronome() {
    setMetronomeActive(false);
    setMetronomeTicks(0);
  }

  useInterval(
    () => {
      if (metronomeActive) {
        setMetronomeTicks(metronomeTicks + 1);
      }
    },
    metronomeActive ? (ONE_MINUTE_IN_MILISECONDS / bpm) * metronomeStep : null,
  );

  return (
    <MetronomeContext.Provider
      value={{
        bpm,
        setBpm,
        metronomeActive,
        setMetronomeActive,
        metronomeTicks,
        setMetronomeTicks,
        resetMetronome,
      }}
    >
      {children}
    </MetronomeContext.Provider>
  );
};
