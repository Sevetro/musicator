import { FC, useContext } from "react";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";

import { MetronomeContext } from "../context/metronome-context";
import {
  DefaultButtonProps,
  DefaultWrapperProps,
} from "@/models/default-props";
import InputNumber from "./input-number";

const minBpmValue = 1;
const maxBpmValue = 300;

export const Metronome: FC = () => {
  const { bpm, setBpm, metronomeActive, setMetronomeActive } =
    useContext(MetronomeContext);

  function handleBpmChange(value: number) {
    if (value > 300 || value < 1) return;
    setBpm(value);
  }

  console.log(metronomeActive);

  return (
    <Container>
      <Space>
        <Button
          disabled={bpm === minBpmValue}
          onClick={() => handleBpmChange(bpm - 1)}
        >
          -
        </Button>
        <InputNumber
          min={minBpmValue}
          max={maxBpmValue}
          onChange={setBpm}
          value={bpm}
        />
        <Button
          disabled={bpm === maxBpmValue}
          onClick={() => handleBpmChange(bpm + 1)}
        >
          +
        </Button>
      </Space>

      <Space>
        <Button onClick={() => setMetronomeActive(!metronomeActive)}>
          {metronomeActive ? (
            <PauseIcon width={10} height={10} />
          ) : (
            <PlayIcon width={10} height={10} />
          )}
        </Button>
      </Space>
    </Container>
  );
};

const Button = ({ children, ...props }: DefaultButtonProps) => (
  <button {...props} className="btn btn-primary">
    {children}
  </button>
);

const Space = ({ children }: DefaultWrapperProps) => (
  <div className="flex justify-center">{children}</div>
);

const Container = ({ children }: DefaultWrapperProps) => (
  <div className="p-2 border-2 border-solid border-indigo-500 rounded-lg">
    {children}
  </div>
);
