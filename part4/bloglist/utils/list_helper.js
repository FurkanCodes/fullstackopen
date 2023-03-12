const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return (likes = blogs.reduce((sum, blog) => sum + blog.likes, 0));
};

const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.reduce((favorite, blog) =>
    favorite.likes > blog.likes ? fav : blog
  );
  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
