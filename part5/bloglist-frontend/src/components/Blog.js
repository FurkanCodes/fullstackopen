const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author} {blog.likes} {blog.url}
  </div>
);

export default Blog;
