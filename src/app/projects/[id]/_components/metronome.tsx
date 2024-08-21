import { FC, useContext } from "react";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";

import InputNumber from "./input-number";
import { MetronomeContext } from "../_context/metronome-context";

const minBpmValue = 1;
const maxBpmValue = 300;

export const Metronome: FC = () => {
  const { bpm, setBpm, metronomeActive, setMetronomeActive } =
    useContext(MetronomeContext);

  function handleBpmChange(value: number) {
    if (value > maxBpmValue || value < minBpmValue) return;
    setBpm(value);
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <button
          className="btn btn-primary"
          disabled={bpm === minBpmValue}
          onClick={() => handleBpmChange(bpm - 1)}
        >
          -
        </button>
        <InputNumber
          min={minBpmValue}
          max={maxBpmValue}
          onChange={setBpm}
          value={bpm}
        />
        <button
          className="btn btn-primary"
          disabled={bpm === maxBpmValue}
          onClick={() => handleBpmChange(bpm + 1)}
        >
          +
        </button>
      </div>

      <button
        className="btn btn-primary mt-1"
        onClick={() => setMetronomeActive(!metronomeActive)}
      >
        {metronomeActive ? (
          <PauseIcon width={10} height={10} />
        ) : (
          <PlayIcon width={10} height={10} />
        )}
      </button>
    </div>
  );
};
