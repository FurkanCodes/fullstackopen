const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuid } = require('uuid')
require('dotenv').config()

const mongoose = require('mongoose');
const Book = require('./models/Book');
const Author = require("./models/Author")
const { GraphQLError } = require('graphql');

const MONGODB_URI = process.env.MONGO_DB_URI
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]


let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]



const typeDefs = `
  type Query {
   bookCount: Int!
   authorCount: Int!
   allBooks(author: String, genre: String): [Book!]! 
   allAuthors: [Author!]!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String
    born: Int
    bookCount: Int!  # New field to represent the number of books written by the author
    id: ID!
  }

  type Mutation {
    addBook(
      title: String!
      author: String! 
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return books;
      }

      let filteredBooks = books;

      if (args.author) {
        filteredBooks = filteredBooks.filter((book) => book.author === args.author);
      }

      if (args.genre) {
        filteredBooks = filteredBooks.filter((book) => book.genres.includes(args.genre));
      }

      return filteredBooks;
    },

    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => { return books.filter(b => b.author === root.name).length }
  },
  Mutation: {

    addBook: async (root, args) => {
      const { title, author, published, genres } = args;

      // Find the author in the database based on the provided name
      let foundAuthor = await Author.findOne({ name: author });

      // If the author doesn't exist, create a new author and save it to the database
      if (!foundAuthor) {
        foundAuthor = new Author({ name: author });
        await foundAuthor.save();
      }

      // Create a new book with the associated author's ObjectId
      const newBook = new Book({
        title,
        author: foundAuthor._id, // Assign the author's ObjectId
        published,
        genres,
      });

      return newBook.save()
    },

    editAuthor: (root, args) => {
      const { name, setBornTo } = args;

      const author = authors.find((auth) => auth.name === name);
      if (!author) {
        throw new Error('Author not found');
      }

      // Assuming 'setBornTo' is an integer representing the birth year
      if (isNaN(setBornTo) || setBornTo < 0) {
        throw new Error('Invalid birth year');
      }
      author.born = setBornTo;
      return author;
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
