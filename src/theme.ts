import { createTheme, MantineColorsTuple, rem } from "@mantine/core";

const green: MantineColorsTuple = [
  "#ebfff4",
  "#d5fee7",
  "#a5fdcb",
  "#73fdae",
  "#50fd95",
  "#3ffd86",
  "#36fe7d",
  "#2be26a",
  "#1fc85d",
  "#00ad4d",
];

export const theme = createTheme({
  fontFamily: "Verdana, sans-serif",
  headings: {
    sizes: {
      h1: {
        fontWeight: "100",
        fontSize: rem(48),
        lineHeight: "1.4",
      },
    },
  },

  colors: {
    green,
  },
});
