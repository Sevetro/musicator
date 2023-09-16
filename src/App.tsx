import styled from "styled-components";
import { MainPage } from "./components/MainPage";

function App() {
  return (
    <MainContainer>
      <MainPage />
    </MainContainer>
  );
}

export default App;

const MainContainer = styled.div`
  margin: 10px;
`;
