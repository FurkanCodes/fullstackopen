import React from "react";
import { render, screen } from "@testing-library/react";
import Blog, { updateLikes, handleLike } from "./Blog";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

describe("blog tests", () => {
  const blog = {
    title: "first test",
    author: "furkan",
    url: "https://hey.com/",
    likes: 7,
  };
  let mockUpdateBlog = jest.fn();
  test("renders blog title and author", () => {
    const { container } = render(<Blog blog={blog} />);
    const title = container.querySelector(".blog-title");
    const author = container.querySelector(".blog-author");

    expect(title).toHaveTextContent("first test");
    expect(author).toHaveTextContent("furkan");
  });

  test("after clicking the button, children are displayed", async () => {
    const component = render(<Blog blog={blog} updateLikes={mockUpdateBlog} />);

    const user = userEvent.setup();
    const button = component.getByText("add like");
    await user.click(button);

    expect(component.container).toHaveTextContent("https://hey.com/");

    expect(component.container).toHaveTextContent("7");
  });

  test("click like button twice and likes will plus two", async () => {
    const component = render(<Blog blog={blog} updateLikes={mockUpdateBlog} />);
    const user = userEvent.setup();
    const button = component.getByText("view details");
    await user.click(button);

    const blogAll = component.container.querySelector(".blogAll");
    expect(blogAll).toBeVisible();

    const buttonLike = component.getByText("add like");
    await user.click(buttonLike);
    await user.click(buttonLike);

    expect(mockUpdateBlog.mock.calls).toHaveLength(2);
  });
});
