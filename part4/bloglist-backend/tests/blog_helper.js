const Blog = require("../models/blog");
const User = require("../models/user");

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const initialBlogs = [
  {
    author: "FURKAN1!1",
    title: "heyyy",
    likes: 4,
  },
  {
    author: "asdasd!1",
    title: "tielee",
    likes: 2,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
