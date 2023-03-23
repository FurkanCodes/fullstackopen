const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("../tests/blog_helper");
const api = supertest(app);
const Blog = require("../models/blog");
const blog = require("../models/blog");
beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("cleared");

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArr = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArr);
  console.log("done");
});
test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});
test('Blog post unique identifier property is named "id"', async () => {
  const blogPost = await helper.blogsInDb();

  const firstBlog = blogPost[0];

  expect(firstBlog.id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "welcome to my life",
    author: "leslie",
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((b) => b.title);
  expect(titles).toContain("welcome to my life");
});

// test("blogs are returned as json", async () => {
//   await api
//     .get("/api/blogs")
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
// });

// test("there are two blogs", async () => {
//   const response = await api.get("/api/blogs");
//   expect(response.body).toHaveLength(2);
// });

// test("first author is FURKAN1!1", async () => {
//   const response = await api.get("/api/blogs");
//   expect(response.body[0].author).toBe("FURKAN1!1");
// });

// test("a specific blog in returned blogs", async () => {
//   const response = await api.get("/api/blogs");
//   const titles = response.body.map((res) => res.title);
//   expect(titles).toContain("heyyy");
// });

// test("blog without title is not added", async () => {
//   const newBlog = {
//     author: "",
//   };
//   await api.post("/api/blogs").send(newBlog).expect(400);

//   const blogsAtEnd = await helper.blogsInDb();

//   expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
// });

// test("a specific blog can be viewed", async () => {
//   const blogsAtStart = await helper.blogsInDb();

//   const blogToView = blogsAtStart[0];

//   const resultBlog = await api
//     .get(`/api/blogs/${blogToView.id}`)
//     .expect(200)
//     .expect("Content-Type", /application\/json/);
//   expect(resultBlog.body).toEqual(blogToView);
// });

afterAll(async () => {
  await mongoose.connection.close();
});
