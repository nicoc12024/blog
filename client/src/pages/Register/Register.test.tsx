import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useRegister } from "./useRegister";
import { Register } from "./Register";

jest.mock("./useRegister");

describe("<Register />", () => {
  let mockInputs: { username: string; email: string; password: string };
  let mockError: string | null;
  let mockHandleChange: jest.Mock;
  let mockHandleRegister: jest.Mock;

  beforeEach(() => {
    mockInputs = { username: "", email: "", password: "" };
    mockError = null;
    mockHandleChange = jest.fn();
    mockHandleRegister = jest.fn();

    (useRegister as jest.Mock).mockReturnValue({
      inputs: mockInputs,
      handleChange: mockHandleChange,
      handleRegister: mockHandleRegister,
      error: mockError,
    });
  });

  it("renders without crashing", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    expect(getByText("Register")).toBeInTheDocument();
  });

  it("calls handleRegister when register button is clicked", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    fireEvent.click(getByText("Register Now"));
    expect(mockHandleRegister).toHaveBeenCalledTimes(1);
  });

  it("displays error message when error is present", () => {
    mockError = "Some error";
    (useRegister as jest.Mock).mockReturnValue({
      inputs: mockInputs,
      error: mockError,
      handleChange: mockHandleChange,
      handleLogin: mockHandleRegister,
    });
    const { getByText } = render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    expect(getByText("Some error")).toBeInTheDocument();
  });
});
