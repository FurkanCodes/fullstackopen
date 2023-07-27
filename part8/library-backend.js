const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuid } = require('uuid')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Author = require("./models/Author")
const User = require("./models/User")
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Query {
    me: User
  }
  
  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: async (root, args) => {
      // Handle the query for all books with optional parameters: author and genre
      const { author, genre } = args;
      const queryConditions = {};

      // If author parameter is provided, find the author in the database based on the name
      if (author) {
        const foundAuthor = await Author.findOne({ name: author });

        // If the author is found, add the author's ObjectId to the query conditions
        if (foundAuthor) {
          queryConditions.author = foundAuthor._id;
        } else {
          // If author is not found, return an empty array as no books will be found
          return [];
        }
      }
      // If genre parameter is provided, add the genre to the query conditions
      if (genre) {
        queryConditions.genres = { $in: [genre] };
      }

      // Use the query conditions to find the books in the database
      return Book.find(queryConditions).populate('author');
    },
    me: (root, args, context) => {
      // Check if a user is authenticated based on the token in the context
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('Not authenticated. You must log in first.');
      }

      return currentUser;
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => { return books.filter(b => b.author === root.name).length }
  },
  Mutation: {
    addBook: async (root, args) => {
      const { title, author, published, genres } = args;

      // Validate input data before saving to the database
      if (title.length < 5) {
        throw new UserInputError('Book title must be at least 5 characters long.', {
          invalidArgs: { title },
        });
      }

      // Find the author in the database based on the provided name
      let foundAuthor = await Author.findOne({ name: author });

      // If the author doesn't exist, create a new author and save it to the database
      if (!foundAuthor) {
        foundAuthor = new Author({ name: author });
        try {
          await foundAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: { author } });
        }
      }

      // Create a new book with the associated author's ObjectId
      const newBook = new Book({
        title,
        author: foundAuthor._id, // Assign the author's ObjectId
        published,
        genres,
      });

      try {
        return newBook.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    editAuthor: async (root, args) => {
      const { name, setBornTo } = args;

      // Find the author in the database based on the provided name
      const foundAuthor = await Author.findOne({ name });

      if (!foundAuthor) {
        return null; // Return null if the author is not found
      }

      // Update the author's born field and save the changes
      foundAuthor.born = setBornTo;
      try {
        return foundAuthor.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
