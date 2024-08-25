import { Sound } from "./sound";

export interface SoundBoardData {
  isActive: boolean;
  sounds: Sound[];
  isMuted: boolean;
  name?: string;
}
