const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("../tests/blog_helper");
const api = supertest(app);
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });

  await user.save();
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
    likes: 0,
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

it("should create a blog with likes set to 0 if not provided", async () => {
  const blog = {
    title: "Test blog",
    author: "Test author",
  };

  const response = await api.post("/api/blogs").send(blog);

  expect(response.status).toBe(201);
  expect(response.body.likes).toBe(0);
});

test("blog without title is not added", async () => {
  const newBlog = {
    author: "Test author",
    url: "https://example.com",
    likes: 0,
  };
  const response = await api.post("/api/blogs").send(newBlog);

  expect(response.status).toBe(400);
});

test("blog without title or url is not added", async () => {
  const newBlog = {
    author: "Test author",
    likes: 0,
  };
  const response = await api.post("/api/blogs").send(newBlog);
  expect(response.status).toBe(400);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(2);
});

test("a specific blog in returned blogs", async () => {
  const response = await api.get("/api/blogs");
  const titles = response.body.map((res) => res.title);
  expect(titles).toContain("heyyy");
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

test("a specific blog can be viewed", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(resultBlog.body).toEqual(blogToView);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
});
test("a blog can be edited", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  await api.put(`/api/blogs/${blogToUpdate.id}`).expect(200);
});

describe("when there is initially one user in db", () => {
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

describe("when there is initially one user in db", () => {
  // ...

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
