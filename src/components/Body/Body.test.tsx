import { render, screen, fireEvent, waitFor } from "../../../test-utils";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import Body from "./Body";

describe("Body component", () => {
  it("opens modal when 'Request an invite' button is clicked", async () => {
    render(<Body />);

    const openButton = screen.getByText("Request an invite");
    expect(openButton).toBeInTheDocument();

    fireEvent.click(openButton);

    await waitFor(() => {
      const modalTitle = screen.getByText("Request an invite", {
        selector: "h2",
      });
      expect(modalTitle).toBeInTheDocument();
    });

    expect(screen.getByLabelText("Full name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm email")).toBeInTheDocument();
    expect(screen.getByText("Send")).toBeInTheDocument();
  });

  it("Name in form is too short validation error", async () => {
    render(<Body />);

    const openButton = screen.getByText("Request an invite");
    expect(openButton).toBeInTheDocument();

    fireEvent.click(openButton);

    await waitFor(() => {
      const modalTitle = screen.getByText("Request an invite", {
        selector: "h2",
      });
      expect(modalTitle).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText("Full name");
    fireEvent.change(nameInput, { target: { value: "a" } });

    const submitButton = screen.getByText("Send");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Full name must be at least 3 characters.")
      ).toBeInTheDocument();
    });
  });

  it("Email and Confirm Email in form is empty validation error", async () => {
    render(<Body />);

    const openButton = screen.getByText("Request an invite");
    expect(openButton).toBeInTheDocument();

    fireEvent.click(openButton);

    await waitFor(() => {
      const modalTitle = screen.getByText("Request an invite", {
        selector: "h2",
      });
      expect(modalTitle).toBeInTheDocument();
    });

    const submitButton = screen.getByText("Send");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const emailErrors = screen.getAllByText("Email cannot be empty.");
      const emailInput = screen.getByLabelText("Email");
      const confirmEmailInput = screen.getByLabelText("Confirm email");

      expect(emailInput.closest(".mantine-InputWrapper-root")).toContainElement(
        emailErrors[0]
      );
      expect(
        confirmEmailInput.closest(".mantine-InputWrapper-root")
      ).toContainElement(emailErrors[1]);
    });
  });

  it("Email not empty and Confirm email empty validation error", async () => {
    render(<Body />);

    const openButton = screen.getByText("Request an invite");
    expect(openButton).toBeInTheDocument();

    fireEvent.click(openButton);

    await waitFor(() => {
      const modalTitle = screen.getByText("Request an invite", {
        selector: "h2",
      });
      expect(modalTitle).toBeInTheDocument();
    });
    const emailInput = screen.getByLabelText("Email");
    const confirmEmailInput = screen.getByLabelText("Confirm email");

    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    const submitButton = screen.getByText("Send");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const emailDifferentError = screen.getByText(
        "Emails provided are not the same."
      );
      const emptyEmailErrors = screen.getByText("Email cannot be empty.");

      expect(emailInput.closest(".mantine-InputWrapper-root")).toContainElement(
        emailDifferentError
      );
      expect(
        confirmEmailInput.closest(".mantine-InputWrapper-root")
      ).toContainElement(emptyEmailErrors);
    });
  });

  it("Provided emails are the same but is not valid", async () => {
    render(<Body />);

    const openButton = screen.getByText("Request an invite");
    expect(openButton).toBeInTheDocument();

    fireEvent.click(openButton);

    await waitFor(() => {
      const modalTitle = screen.getByText("Request an invite", {
        selector: "h2",
      });
      expect(modalTitle).toBeInTheDocument();
    });
    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "test@gmail" } });

    const confirmEmailInput = screen.getByLabelText("Confirm email");
    fireEvent.change(confirmEmailInput, { target: { value: "test@gmail" } });

    const submitButton = screen.getByText("Send");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const invalidEmailErrors = screen.getAllByText("Email is not valid.");

      expect(emailInput.closest(".mantine-InputWrapper-root")).toContainElement(
        invalidEmailErrors[0]
      );
      expect(
        confirmEmailInput.closest(".mantine-InputWrapper-root")
      ).toContainElement(invalidEmailErrors[1]);
    });
  });
});
