import { UnstyledButton, Text } from "@mantine/core";
import classes from "./Header.module.css";

export function Header() {
  return (
    <header className={classes.header}>
      <UnstyledButton>
        <Text fw={700} size="xl">
          BROCCOLI & CO.
        </Text>
      </UnstyledButton>
    </header>
  );
}
