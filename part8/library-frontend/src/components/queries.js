import { gql } from '@apollo/client';
export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
    }
    genres
  }
`;
export const GET_ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const GET_ALL_BOOKS = gql`
query getAllBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    published
    author {
      name
    }
    genres
  }
}

`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    author {
      name
      born
    }
    published
    genres
  }
}

`

export const EDIT_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
      name
      born
    }
  }
`;

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password)  {
    value
  }
}
`
export const BOOKS_BY_FAVORITE_GENRE = gql`
  query BooksByFavoriteGenre {
    booksByFavoriteGenre {
      title
      published
      author {
        name
      }
      genres
    }
  }
`;

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      username
      favoriteGenre
    }
  }
`;

export const BOOK_ADDED = gql`  

subscription {   
  bookAdded {    
    ...BookDetails    
  } 
 }  
 ${BOOK_DETAILS}
    `