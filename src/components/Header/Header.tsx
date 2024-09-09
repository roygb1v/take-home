import { UnstyledButton, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";

export default function NavigationHeader() {
  const navigate = useNavigate();
  return (
    <header className={classes.header}>
      <UnstyledButton
        onClick={() => {
          navigate("/");
        }}
      >
        <Text fw={700} size="xl">
          BROCCOLI & CO.
        </Text>
      </UnstyledButton>
    </header>
  );
}
