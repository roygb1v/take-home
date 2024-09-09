import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider, Text } from "@mantine/core";
import { theme } from "./theme";
import WelcomePage from "./pages/WelcomePage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => ({ message: "Loading..." }),
    Component: () => <WelcomePage />,
    errorElement: <ErrorPage />,
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
