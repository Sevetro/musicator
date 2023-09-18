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
  padding: 10px;
  background-color: #15685a;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
`;
