import { Dispatch } from "react";
import { FC, PropsWithChildren, createContext, useState } from "react";
import { useInterval } from "react-use";

const ONE_MINUTE_IN_SECONDS = 60 * 1000;

interface MetronomeContext {
  bpm: number;
  setBpm: Dispatch<React.SetStateAction<number>>;
  isActive: boolean;
  setIsActive: Dispatch<React.SetStateAction<boolean>>;
  metronomeTicks: number;
  setMetronomeTicks: Dispatch<React.SetStateAction<number>>;
  resetMetronome: () => void;
}

const defaultMetronomeContextValues = {
  bpm: 200,
  setBpm: () => null,
  isActive: false,
  setIsActive: () => null,
  metronomeTicks: 0,
  setMetronomeTicks: () => null,
  resetMetronome: () => null,
};

export const MetronomeContext = createContext<MetronomeContext>(
  defaultMetronomeContextValues
);

export const MetronomeContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [bpm, setBpm] = useState(defaultMetronomeContextValues.bpm);
  const [isActive, setIsActive] = useState(
    defaultMetronomeContextValues.isActive
  );
  const [metronomeTicks, setMetronomeTicks] = useState(
    defaultMetronomeContextValues.metronomeTicks
  );

  function resetMetronome() {
    setIsActive(false);
    setMetronomeTicks(0);
  }

  useInterval(() => {
    if (isActive) {
      setMetronomeTicks(metronomeTicks + 1);
    }
  }, ONE_MINUTE_IN_SECONDS / bpm);

  return (
    <MetronomeContext.Provider
      value={{
        bpm,
        setBpm,
        isActive,
        setIsActive,
        metronomeTicks,
        setMetronomeTicks,
        resetMetronome,
      }}
    >
      {children}
    </MetronomeContext.Provider>
  );
};
