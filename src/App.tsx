import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { MainPage } from "./components/MainPage";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <MainPage />
    </DndProvider>
  );
}

export default App;
