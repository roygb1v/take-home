import { render, screen } from "../../../test-utils";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import SuccessModal from "./SuccessModal";

describe("SuccessModal component", () => {
  it("renders the SuccessModal component", () => {
    render(<SuccessModal />);
    const titleElement = screen.getByText("All done!");
    const descElement = screen.getByText(
      "You will be one of the first to experience Broccoli & Co. when we launch."
    );

    expect(titleElement).toBeInTheDocument();
    expect(descElement).toBeInTheDocument();
  });
});
