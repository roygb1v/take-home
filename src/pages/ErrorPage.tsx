import { Text } from "@mantine/core";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <Text fw={700} size="xl">
        Oops! Something went wrong.
      </Text>
      <Text>{error.statusText || error.message}</Text>
    </div>
  );
}
