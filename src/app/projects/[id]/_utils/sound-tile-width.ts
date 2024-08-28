import { SoundDuration } from "../../_models/sound";

export function getSoundTileWidth(duration: SoundDuration) {
  return duration * 5;
}
