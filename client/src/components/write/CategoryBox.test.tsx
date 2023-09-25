import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { CategoryBox } from "./CategoryBox";

describe("CategoryBox Component", () => {
  it("renders correctly", () => {
    const mockSetCat = jest.fn();
    const catArray = [
      { id: 1, name: "Test Cat 1", value: "test_cat_1" },
      { id: 2, name: "Test Cat 2", value: "test_cat_2" },
    ];

    const { getByText } = render(
      <CategoryBox cat="test_cat_1" setCat={mockSetCat} catArray={catArray} />
    );

    expect(getByText("Category")).toBeInTheDocument();
  });

  it("renders correct number of SingleCat components", () => {
    const mockSetCat = jest.fn();
    const catArray = [
      { id: 1, name: "Test Cat 1", value: "test_cat_1" },
      { id: 2, name: "Test Cat 2", value: "test_cat_2" },
      { id: 3, name: "Test Cat 3", value: "test_cat_3" },
    ];

    const { getAllByRole } = render(
      <CategoryBox cat="test_cat_1" setCat={mockSetCat} catArray={catArray} />
    );

    const radios = getAllByRole("radio");
    expect(radios.length).toBe(catArray.length);
  });
});
