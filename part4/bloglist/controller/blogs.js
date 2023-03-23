const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
require("express-async-errors");
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

//gets one blog
blogsRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogsRouter.post("/", async (req, res, next) => {
  let { title, author, url, likes } = req.body;

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
  });
  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res, next) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

module.exports = blogsRouter;
