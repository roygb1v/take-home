import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import styled from "styled-components";
import NavigationHeader from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Wrapper>
        <NavigationHeader />
        <Body />
        <Footer />
      </Wrapper>
    </MantineProvider>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
