import { render } from "../test-utils";
import { describe, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the App component", () => {
    render(<App />);
  });
});
