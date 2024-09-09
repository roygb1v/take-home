import { render, screen } from "../../../test-utils";
import { describe, it, expect } from "vitest";
import Content from "./Content";

describe("Default Content component", () => {
  it("renders the default Content component", () => {
    render(<Content />);

    const titleElement = screen.getByText("A better way to enjoy every day.");
    const descElement = screen.getByText(
      "Be the first to know when we launch."
    );

    expect(titleElement).toBeInTheDocument();
    expect(descElement).toBeInTheDocument();
  });

  it("renders the updated props Content component", () => {
    render(
      <Content title="This is a title" description="This is the description" />
    );

    const titleElement = screen.getByText("This is a title");
    const descElement = screen.getByText("This is the description");

    expect(titleElement).toBeInTheDocument();
    expect(descElement).toBeInTheDocument();
  });
});
