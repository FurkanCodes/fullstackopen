import React, { useState } from 'react';

import { ADD_BOOK, GET_ALL_BOOKS, GET_ALL_AUTHORS } from './queries';
import { useMutation } from '@apollo/client'
import { updateCache } from '../App';
const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);





  // const [addBook] = useMutation(ADD_BOOK, {

  //   update: (cache, { data: { addBook } }) => {

  //     // Get the current data from the cache for GET_ALL_BOOKS
  //     const { allBooks } = cache.readQuery({ query: GET_ALL_BOOKS });

  //     // Update the cache with the new book
  //     cache.writeQuery({
  //       query: GET_ALL_BOOKS,
  //       data: { allBooks: allBooks.concat(addBook) },
  //     });
  //   },
  // });


  const [addBook] = useMutation(ADD_BOOK, {

    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
    update: (cache, response) => {
      updateCache(cache, { query: GET_ALL_BOOKS }, response.data.addBook)
    },
  })
  const submit = async (event) => {
    event.preventDefault();
    addBook({
      variables: { title, author, published: parseInt(published), genres },
      // Refetch GET_ALL_BOOKS query after adding a new book
      refetchQueries: [{ query: GET_ALL_BOOKS }, { query: GET_ALL_AUTHORS }],
    });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');

    console.log('add book...');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
