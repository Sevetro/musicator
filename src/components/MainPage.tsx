import { Col, Row } from "antd";
import { FC } from "react";

import { Metronome } from "./Metronome";
import { SoundBoard } from "./SoundBoard";
import { useMetronome } from "../hooks/useMetronome";

export const MainPage: FC = () => {
  const { bpm, setBpm, isActive, setIsActive, metronomeTicks } = useMetronome();

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Metronome
          bpm={bpm}
          setBpm={setBpm}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      </Col>

      <Col span={24}>
        <SoundBoard metronomeTicks={metronomeTicks} />
      </Col>
    </Row>
  );
};
