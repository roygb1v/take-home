import styled from "styled-components";
import { Button, Text, Loader } from "@mantine/core";

interface GenericButtonProps {
  size?: string;
  variant?: string;
  type?: string;
  isLoading?: boolean;
  loadingText?: string;
  actionText: string;
  onClick?: () => void;
}

export default function GenericButton({
  size = "md",
  variant = "filled",
  type = "submit",
  isLoading,
  loadingText,
  actionText,
  onClick,
}: GenericButtonProps) {
  return (
    <Button
      size={size}
      variant={variant}
      type={type}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <Container $alignItems="center" $gap="0.5rem">
          <Loader size={14} />
          <Text>{loadingText}</Text>
        </Container>
      ) : (
        <Text fw={700}>{actionText}</Text>
      )}
    </Button>
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
