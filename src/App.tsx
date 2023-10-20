import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { MainPage } from "./components/main-page";
import { MetronomeContextProvider } from "./data/metronome-context";
import { SoundBoardsContextProvider } from "./data/sound-boards-context";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <MetronomeContextProvider>
        <SoundBoardsContextProvider>
          <MainPage />
        </SoundBoardsContextProvider>
      </MetronomeContextProvider>
    </DndProvider>
  );
}

export default App;
