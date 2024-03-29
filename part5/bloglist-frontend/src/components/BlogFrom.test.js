import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();
  render(<BlogForm createBlog={createBlog} />);
  const input = screen.getByPlaceholderText("title");
  const postBtn = screen.getByText("post");
  await user.type(input, "testing a form...");
  await user.click(postBtn);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");
});
