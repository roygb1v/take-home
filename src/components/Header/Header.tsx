import { Text } from "@mantine/core";
import classes from "./Header.module.css";

export function Header() {
  return (
    <header className={classes.header}>
      <Text size="xl">BROCCOLI & CO.</Text>
    </header>
  );
}
