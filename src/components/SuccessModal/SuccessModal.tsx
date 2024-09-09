import styled from "styled-components";
import { Title, Text, TextProps, Divider } from "@mantine/core";

interface SuccessModalProps {
  title?: string;
  description?: string;
}

export default function SuccessModal({
  title = "All done!",
  description = "You will be one of the first to experience Broccoli & Co. when we launch.",
}: SuccessModalProps) {
  return (
    <Container direction="column" $gap="2rem" $alignItems="center">
      <Container direction="column" $gap="1rem" $alignItems="center">
        <Title order={2}>{title}</Title>
        <SmallDivider size="md" />
      </Container>
      <CenteredText>{description}</CenteredText>
    </Container>
  );
}

interface ContainerProps {
  direction?: string;
  $marginBottom?: string;
  $alignItems?: string;
  justifyContent?: string;
  $gap?: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  align-items: ${(props) => props.$alignItems};
  justify-content: ${(props) => props.justifyContent};
  gap: ${(props) => props.$gap};
  margin-bottom: ${(props) => props.$marginBottom};
`;

interface CenteredTextProps extends TextProps {
  width?: string;
}

const CenteredText = styled(Text)<CenteredTextProps>`
  text-align: center;
  width: ${(props) => props.width};
`;

const SmallDivider = styled(Divider)`
  width: 4rem;
  margin: auto;
  border-radius: 1rem;
`;
