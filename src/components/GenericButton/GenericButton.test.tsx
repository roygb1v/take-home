import { render, screen } from "../../../test-utils";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import GenericButton from "./GenericButton";

describe("GenericButton Component", () => {
  it("renders with default props", () => {
    render(<GenericButton />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Send");
    expect(button).not.toBeDisabled();
  });

  it("renders with custom action text", () => {
    render(<GenericButton actionText="Custom Action" />);
    expect(screen.getByRole("button")).toHaveTextContent("Custom Action");
  });

  it("renders loading state", () => {
    render(<GenericButton isLoading={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(screen.getByText("Please wait")).toBeInTheDocument();
  });

  it("renders loading state with custom loading text", () => {
    render(<GenericButton isLoading={true} loadingText="Processing..." />);
    expect(screen.getByText("Processing...")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<GenericButton onClick={handleClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom size prop", () => {
    render(<GenericButton size="lg" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-size", "lg");
  });

  it("applies custom variant prop", () => {
    render(<GenericButton variant="outline" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-variant", "outline");
  });

  it("applies custom type prop", () => {
    render(<GenericButton type="button" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });
});
