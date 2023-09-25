import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useLogin } from "./useLogin";
import { Login } from "./Login";

jest.mock("./useLogin");
describe("<Login />", () => {
  let mockInputs: { username: string; password: string };
  let mockError: string | null;
  let mockHandleChange: jest.Mock;
  let mockHandleLogin: jest.Mock;

  beforeEach(() => {
    mockInputs = { username: "", password: "" };
    mockError = null;
    mockHandleChange = jest.fn();
    mockHandleLogin = jest.fn();

    (useLogin as jest.Mock).mockReturnValue({
      inputs: mockInputs,
      error: mockError,
      handleChange: mockHandleChange,
      handleLogin: mockHandleLogin,
    });
  });

  it("renders without crashing", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(getByText("Login")).toBeInTheDocument();
  });

  it("calls handleLogin when login button is clicked", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.click(getByText("Login Now"));
    expect(mockHandleLogin).toHaveBeenCalledTimes(1);
  });

  it("displays error message when error is present", () => {
    mockError = "Some error";
    (useLogin as jest.Mock).mockReturnValue({
      inputs: mockInputs,
      error: mockError,
      handleChange: mockHandleChange,
      handleLogin: mockHandleLogin,
    });

    const { getByText } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(getByText("Some error")).toBeInTheDocument();
  });
});
