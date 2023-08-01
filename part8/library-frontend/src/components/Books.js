import { useState } from "react";
import { GET_ALL_BOOKS } from "./queries"
import { useQuery } from '@apollo/client'

const Books = (props) => {

  const [selectedGenre, setSelectedGenre] = useState(null);
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);
  const books = data?.allBooks || []; // Use optional chaining to avoid accessing data when it's undefined
  const genres = Array.from(new Set(books.flatMap((book) => book.genres)));

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredBooks = selectedGenre
    ? books.filter((book) => book.genres.includes(selectedGenre))
    : books;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreClick(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>All genres</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>

          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <th>{a.title}</th>
              <th>{a.author.name}</th>
              <th>{a.published}</th>
              <th>{a.genres}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Books
