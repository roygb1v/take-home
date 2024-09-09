import { render, screen } from "../../../test-utils";

import Footer from "./Footer";

// Mock the @tabler/icons-react package
vi.mock("@tabler/icons-react", () => ({
  IconHeartFilled: () => <span data-testid="heart-icon-filled">❤️</span>,
}));

describe("Footer component", () => {
  it("renders the Footer component", () => {
    render(<Footer />);

    const titleElement = screen.getByText(
      "2024 Broccoli and Co. All rights reserved."
    );
    expect(titleElement).toBeInTheDocument();

    const iconHeartFilledIcon = screen.getByTestId("heart-icon-filled");
    expect(iconHeartFilledIcon).toBeInTheDocument();

    expect(screen.getByText(/Made with/)).toBeInTheDocument();
    expect(screen.getByText(/from Melbourne/)).toBeInTheDocument();
  });
});
