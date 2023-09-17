import styled from "styled-components";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { MainPage } from "./components/MainPage";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <MainContainer>
        <MainPage />
      </MainContainer>
    </DndProvider>
  );
}

export default App;

const MainContainer = styled.div`
  margin: 10px;
`;
