import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { MainPage } from "./components/MainPage";
import { MetronomeContextProvider } from "./data/MetronomeContext";
import { SoundBoardsContextProvider } from "./data/SoundBoardsContext";

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
