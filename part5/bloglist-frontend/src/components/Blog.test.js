import React from "react";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import "@testing-library/jest-dom/extend-expect";

test("renders blog title and author", () => {
  const blog = {
    title: "first test",
    author: "furkan",
  };

  const { container } = render(<Blog blog={blog} />);
  const title = container.querySelector(".blog-title");
  const author = container.querySelector(".blog-author");

  expect(title).toHaveTextContent("first test");
  expect(author).toHaveTextContent("furkan");
});
