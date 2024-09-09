import styled from "styled-components";
import NavigationHeader from "../components/Header/Header";
import Body from "../components/Body/Body";
import Footer from "../components/Footer/Footer";

export default function WelcomePage() {
  return (
    <Wrapper>
      <NavigationHeader />
      <Body />
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
