import { Button, Col, InputNumber, Space } from "antd";
import { FC } from "react";
import styled from "styled-components";
import { CaretRightFilled, PauseOutlined } from "@ant-design/icons";
import { valueType } from "antd/es/statistic/utils";

interface MetronomeProps {
  bpm: number;
  setBpm: React.Dispatch<React.SetStateAction<number>>;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Metronome: FC<MetronomeProps> = ({
  bpm,
  setBpm,
  isActive,
  setIsActive,
}) => {
  function handleBpmChange(value: valueType | null) {
    if (value == null) return;
    const convertedValue = Number(value);
    if (convertedValue > 200 || convertedValue < 1) return;
    setBpm(convertedValue);
  }

  return (
    <>
      <StyledSpace>
        <Button onClick={() => handleBpmChange(bpm - 1)}>-</Button>
        <StyledInput
          min={1}
          max={200}
          controls={false}
          onChange={(value) => handleBpmChange(value)}
          value={bpm}
        />
        <Button onClick={() => handleBpmChange(bpm + 1)}>+</Button>
      </StyledSpace>

      <StyledSpace style={{ marginTop: "5px", marginBottom: "10px" }}>
        <Button
          onClick={() => setIsActive(!isActive)}
          icon={isActive ? <PauseOutlined /> : <CaretRightFilled />}
        />
      </StyledSpace>
    </>
  );
};

const StyledInput = styled(InputNumber)`
  width: 50px;

  .ant-input-number-input {
    text-align: center;
  }
`;

const StyledSpace = styled(Space)`
  display: flex;
  justify-content: center;
`;
