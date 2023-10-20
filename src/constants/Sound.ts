import { MusicalNoteOctave } from "../models/sound";

export const MusicalNotes = {
  A: "A",
  Ab: "Ab",
  "A#": "A#",
  B: "B",
  Bb: "Bb",
  C: "C",
  "C#": "C#",
  D: "D",
  Db: "Db",
  "D#": "D#",
  E: "E",
  Eb: "Eb",
  F: "F",
  "F#": "F#",
  G: "G",
  Gb: "Gb",
  "G#": "G#",
} as const;

export const MusicalNoteOctaves: MusicalNoteOctave[] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
];
