import { Col, Row } from "antd";
import { FC } from "react";

import { Metronome } from "../Metronome";
import { useMetronome } from "../../hooks/useMetronome";
import { SoundBoard } from "../SoundBoard";
import { NotePicker } from "../NotePicker";

export const MainPage: FC = () => {
  const { bpm, setBpm, isActive, setIsActive, metronomeTicks } = useMetronome();

  return (
    <>
      <Row>
        <Col span={8} offset={8}>
          <Metronome
            bpm={bpm}
            setBpm={setBpm}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        </Col>

        <Col span={8}>
          <NotePicker />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <SoundBoard metronomeTicks={metronomeTicks} />
        </Col>
      </Row>
    </>
  );
};
