const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
require("express-async-errors");

const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
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

blogsRouter.post("/", async (req, res) => {
  let { title, author, url, likes } = req.body;

  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(404).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const id = req.params.id;
  const blogToDelete = await Blog.findById(id);
  if (!decodedToken.id) {
    return res.status(404).json({ error: "token missing or invalid" });
  }

  if (blogToDelete.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndDelete(id);
    res.status(204).end();
  } else {
    return res.status(401).json({ error: "You cannot delete" });
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;
  const blog = {
    title: body.title,
    author: body.author,
    likes: body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updatedBlog);
  res.status(200).end();
});
module.exports = blogsRouter;
