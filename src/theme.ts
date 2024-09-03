import { createTheme, MantineColorsTuple, rem } from "@mantine/core";

const colors: MantineColorsTuple = [
  "#000000",
  "#0D0D0D",
  "#101010",
  "#121212",
  "#141414",
  "#161616",
  "#1A1A1A",
  "#1C1C1C",
  "#1E1E1E",
  "#202020",
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
    blue: colors,
  },
});
