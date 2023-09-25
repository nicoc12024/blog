import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AsidePosts } from "./AsidePosts";
import useAsidePosts from "./useAsidePosts";

jest.mock("./useAsidePosts", () => {
  return jest.fn(() => ({
    filteredAndShuffledPosts: [
      { id: 1, title: "Test Title 1", desc: "Test Description", img: "test-image.jpg" },
      { id: 2, title: "Test Title 2", desc: "Test Description", img: "test-image2.jpg" },
    ],
    loading: false,
  }));
});

describe("<AsidePosts />", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders the component with posts", () => {
    const mockedUseAsidePosts = useAsidePosts as jest.MockedFunction<
      typeof useAsidePosts
    >;

    mockedUseAsidePosts.mockReturnValue({
      filteredAndShuffledPosts: [
        { id: 1, title: "Test Title 1", desc: "Test Description", img: "test-image.jpg" },
        {
          id: 2,
          title: "Test Title 2",
          desc: "Test Description",
          img: "test-image2.jpg",
        },
      ],
      loading: false,
    });

    render(
      <Router>
        <AsidePosts cat="some-category" currentPostId={null} />
      </Router>
    );

    expect(screen.getByText("Other posts you may like")).toBeInTheDocument();
  });

  it("renders the component with no posts", () => {
    const mockedUseAsidePosts = useAsidePosts as jest.MockedFunction<
      typeof useAsidePosts
    >;

    mockedUseAsidePosts.mockReturnValue({
      filteredAndShuffledPosts: [],
      loading: false,
    });

    render(
      <Router>
        <AsidePosts cat="some-category" currentPostId={null} />
      </Router>
    );

    expect(screen.getByText("No posts found!")).toBeInTheDocument();
  });

  it("renders the component with loading", () => {
    const mockedUseAsidePosts = useAsidePosts as jest.MockedFunction<
      typeof useAsidePosts
    >;

    mockedUseAsidePosts.mockReturnValue({
      filteredAndShuffledPosts: [],
      loading: true,
    });

    render(
      <Router>
        <AsidePosts cat="some-category" currentPostId={null} />
      </Router>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
