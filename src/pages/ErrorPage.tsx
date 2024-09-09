import { useRouteError } from "react-router-dom";
import { Text, Title, Container, Center } from "@mantine/core";

interface ErrorResponse {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse;
  const errorMessage =
    error.statusText || error.message || "An unknown error occurred";

  return (
    <Container>
      <Center h={200}>
        <Title order={1}>Oops! Something went wrong.</Title>
      </Center>
      <Center>
        <Text mt="md">{errorMessage}</Text>
      </Center>
    </Container>
  );
}
