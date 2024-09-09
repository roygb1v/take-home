import styled from "styled-components";
import { Title, Text } from "@mantine/core";

interface ContentProps {
  title?: string;
  description?: string;
}

export default function Content({
  title = "A better way to enjoy every day.",
  description = "Be the first to know when we launch.",
}: ContentProps) {
  return (
    <Container direction="column" $alignItems="center" $gap="1rem">
      <CenteredTitle order={1} size="h1">
        {title}
      </CenteredTitle>
      <Text size="xl" c="dimmed">
        {description}
      </Text>
    </Container>
  );
}

const CenteredTitle = styled(Title)`
  text-align: center;
`;

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
