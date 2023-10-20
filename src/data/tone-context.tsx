// import { FC, PropsWithChildren, createContext } from "react";
// import * as Tone from "tone";

// //not used, delete

// import { Sound } from "../models/Sound";

// interface ToneContext {
//   playSound: (sound: Sound) => void;
// }

// const defaultToneContextValues = {
//   playSound: () => null,
// };

// const ToneContext = createContext<ToneContext>(defaultToneContextValues);

// const ToneContextProvider: FC<PropsWithChildren> = ({ children }) => {
//   const synth = new Tone.Synth().toDestination();

//   function playSound({ note, duration }: Sound) {
//     if (note !== "") {
//       synth.triggerAttackRelease(note, duration);
//     }
//   }

//   return (
//     <ToneContext.Provider value={{ playSound }}>
//       {children}
//     </ToneContext.Provider>
//   );
// };

export {};
