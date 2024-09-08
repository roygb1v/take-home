import { Text } from "@mantine/core";
import classes from "./Footer.module.css";
import { IconHeartFilled } from "@tabler/icons-react";
import styled from "styled-components";

export default function Footer() {
  return (
    <div className={classes.footer}>
      <TextContainer>
        Made with <IconHeartFilledRed /> from Melbourne
      </TextContainer>
      <Text>2024 Broccoli and Co. All rights reserved.</Text>
    </div>
  );
}

const TextContainer = styled(Text)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconHeartFilledRed = styled(IconHeartFilled)`
  color: red;
`;
