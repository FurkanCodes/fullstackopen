const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});
blogsRouter.post("/", (req, res) => {
  let data = req.body;
  console.log(data);

  const blog = new Blog({
    title: data.title,
    author: data.author,
    url: data.url,
    likes: data.likes,
  });
  blog.save().then((savedBlog) => {
    res.json(savedBlog);
  });
});
module.exports = blogsRouter;
