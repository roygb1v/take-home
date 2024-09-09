import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider, Text } from "@mantine/core";
import { theme } from "./theme";
import WelcomePage from "./pages/WelcomePage";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => ({ message: "Loading..." }),
    Component: () => <WelcomePage />,
  },
]);

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider
        router={router}
        fallbackElement={<Text>Loading...</Text>}
      />
    </MantineProvider>
  );
}
