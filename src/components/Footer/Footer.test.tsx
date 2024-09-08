import { render, screen } from "../../../test-utils";

import Footer from "./Footer";

describe("Footer component", () => {
  it("renders the Footer component", () => {
    render(<Footer />);
    const titleElement = screen.getByText(
      "2024 Broccoli and Co. All rights reserved."
    );

    expect(titleElement).toBeInTheDocument();
  });
});
