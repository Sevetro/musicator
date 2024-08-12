"use client";

import { ChangeEvent } from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}
const InputNumber = ({ value, onChange, min, max }: Props) => {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    if (!/\d+/.test(value)) return;
    if (value.length === 0) {
      onChange(min);
      return;
    }

    const convertedValue = Number(value);
    if (convertedValue <= min) {
      onChange(min);
      return;
    }
    if (convertedValue >= max) {
      onChange(max);
      return;
    }
    onChange(convertedValue);
  }

  return (
    <input
      type="number"
      className="input [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      onChange={handleChange}
      value={value}
      onFocus={(e) => e.target.select()}
    />
  );
};

export default InputNumber;
