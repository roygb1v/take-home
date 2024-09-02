import { Text } from "@mantine/core";
import classes from "./Footer.module.css";

export function Footer() {
  return (
    <div className={classes.footer}>
      <Text>Made with Love from Melbourne</Text>
      <Text>2024 Broccoli and Co. All rights reserved.</Text>
    </div>
  );
}
