import { Button, InputNumber, Space } from "antd";
import { FC, useContext } from "react";
import { CaretRightFilled, PauseOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { valueType } from "antd/es/statistic/utils";

import { MetronomeContext } from "../../data/MetronomeContext";

export const Metronome: FC = () => {
  const { bpm, setBpm, isActive, setIsActive } = useContext(MetronomeContext);

  function handleBpmChange(value: valueType | null) {
    if (value == null) return;
    const convertedValue = Number(value);
    if (convertedValue > 300 || convertedValue < 1) return;
    setBpm(convertedValue);
  }

  return (
    <MetronomeContainer>
      <StyledSpace>
        <Button onClick={() => handleBpmChange(bpm - 1)}>-</Button>
        <StyledInput
          min={1}
          max={300}
          controls={false}
          onChange={(value) => handleBpmChange(value)}
          value={bpm}
        />
        <Button onClick={() => handleBpmChange(bpm + 1)}>+</Button>
      </StyledSpace>

      <StyledSpace style={{ marginTop: "5px" }}>
        <Button
          onClick={() => setIsActive(!isActive)}
          icon={isActive ? <PauseOutlined /> : <CaretRightFilled />}
        />
      </StyledSpace>
    </MetronomeContainer>
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

const MetronomeContainer = styled.div`
  padding: 5px;
  border: 1px solid lightblue;
  border-radius: 5px;
`;
