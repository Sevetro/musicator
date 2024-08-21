import { SoundBoardData } from "./sound-board";

export interface ProjectMetadata {
  title: string;
  createdAt: string;
}

export interface Project extends ProjectMetadata {
  soundBoardsState: SoundBoardData[];
  bpm: number;
}
