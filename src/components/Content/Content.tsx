import React from "react";
import styled from "styled-components";
import { Title, Text, TextProps } from "@mantine/core";

interface ContentProps {
  title?: React.ReactNode;
  description?: string;
}

export default function Content({
  title = (
    <>
      A better way <br />
      to enjoy every day.
    </>
  ),
  description = "Be the first to know when we launch.",
}: ContentProps) {
  return (
    <Container
      direction="column"
      $alignItems="center"
      $gap="1rem"
      $mobilePadding="0rem 0.5rem"
    >
      <CenteredTitle order={1} size="h1">
        {title}
      </CenteredTitle>
      <CenteredText size="xl" c="dimmed">
        {description}
      </CenteredText>
    </Container>
  );
}

const CenteredTitle = styled(Title)`
  text-align: center;
`;

interface CenteredTextProps extends TextProps {
  children: React.ReactNode;
}

const CenteredText = styled(Text)<CenteredTextProps>`
  text-align: center;
`;

interface ContainerProps {
  direction?: string;
  $marginBottom?: string;
  $alignItems?: string;
  justifyContent?: string;
  $gap?: string;
  $mobilePadding?: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "row")};
  align-items: ${(props) => props.$alignItems};
  justify-content: ${(props) => props.justifyContent};
  gap: ${(props) => props.$gap};
  margin-bottom: ${(props) => props.$marginBottom};

  @media (max-width: 768px) {
    padding: ${(props) => props.$mobilePadding || "0rem"};
  }
`;
