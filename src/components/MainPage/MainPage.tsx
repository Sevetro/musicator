import { Col, Row } from "antd";
import { FC } from "react";

import { Metronome } from "../Metronome";
import { useMetronome } from "../../hooks/useMetronome";
import { SoundBoard } from "../SoundBoard";
import { NotePicker } from "../NotePicker";
import {
  MetronomeContext,
  defaultMetronomeValues,
} from "../../data/MetronomeContext";

const {
  bpm: defaultBpm,
  isActive: defaultIsActive,
  metronomeTicks: defaultMetronomeTicks,
} = defaultMetronomeValues;

export const MainPage: FC = () => {
  const {
    bpm,
    setBpm,
    isActive,
    setIsActive,
    metronomeTicks,
    setMetronomeTicks,
  } = useMetronome({ defaultBpm, defaultIsActive, defaultMetronomeTicks });

  return (
    <MetronomeContext.Provider
      value={{
        bpm,
        setBpm,
        isActive,
        setIsActive,
        metronomeTicks,
        setMetronomeTicks,
      }}
    >
      <Row>
        <Col span={8} offset={8}>
          <Metronome />
        </Col>

        <Col span={8}>
          <NotePicker />
        </Col>
      </Row>

      <Row>
        <Col span={10} offset={7}>
          <SoundBoard />
        </Col>
      </Row>
    </MetronomeContext.Provider>
  );
};
