import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { SingleCat } from "./SingleCat";

describe("SingleCat Component", () => {
  it("renders correctly", () => {
    const mockSetCat = jest.fn();

    const { getByLabelText } = render(
      <SingleCat
        singleCat={{ id: 1, name: "Test Cat", value: "test_cat" }}
        cat="test_cat"
        setCat={mockSetCat}
      />
    );

    expect(getByLabelText("Test Cat")).toBeInTheDocument();
  });

  it("sets radio button as checked when cat prop matches", () => {
    const mockSetCat = jest.fn();

    const { getByLabelText } = render(
      <SingleCat
        singleCat={{ id: 1, name: "Test Cat", value: "test_cat" }}
        cat="test_cat"
        setCat={mockSetCat}
      />
    );

    const radio = getByLabelText("Test Cat") as HTMLInputElement;
    expect(radio.checked).toBe(true);
  });

  it("calls setCat when the radio button changes", () => {
    const mockSetCat = jest.fn();

    const { getByLabelText } = render(
      <SingleCat
        singleCat={{ id: 1, name: "Test Cat", value: "test_cat" }}
        cat=""
        setCat={mockSetCat}
      />
    );

    const radio = getByLabelText("Test Cat");
    fireEvent.click(radio);

    expect(mockSetCat).toHaveBeenCalledWith("test_cat");
  });
});
