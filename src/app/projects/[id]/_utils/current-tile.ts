import { SoundDuration } from "../../_models/sound";

export function returnActiveTileId(
  metronomeTicks: number,
  soundDurations: SoundDuration[],
) {
  let tileId = 0;
  let durationsSum = 0;
  const boardDuration = soundDurations.reduce((acc, curr) => acc + curr, 0);
  const metronomePosition = metronomeTicks % boardDuration;

  while (tileId < soundDurations.length) {
    durationsSum = durationsSum + soundDurations[tileId];
    if (durationsSum < metronomePosition + 1) {
      tileId++;
    } else break;
  }

  return tileId;
}
