require('dotenv').config()
const url = process.env.MONGODB_URI
const secret = process.env.JWT_SECRET
const jwt = require('jsonwebtoken')
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

let authors = [
  {
    name: 'Robert Martin',
    //id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    //id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    //id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    //id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    //id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    //id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    //id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    //id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    //id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    //id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    //id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    //id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

console.log('connecting to', url)
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connection to MongoDB:', error.message)
})

// const testBook = [{
//   title: 'Rumy Berg',
//   published: 2010,
//   author: 'Stefan Hoffmann',
//   //id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//   genres: ['novel']
// }]

// const testAuthor = [{
//   name: 'Stefan Hoffmann',
//   born: 1991
// }]

// const initDb = (data, model) => {
//   data.forEach(i => {
//     const newModel = new model(i)
//     newModel.save().then(result => console.log(newModel))
//   });
// }

//initDb(books, Book)
//initDb(authors, Author)

const typeDefs = gql`
  type Author {
    name: String!
    id: ID
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]
    id: ID
  }
  type User {
    username: String!
    books: [Book]
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book]
    allAuthors: [Author!]!
    findAuthor(name: String!): Author
    me: User
  }
  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    editBook(
      title: String!
    ): Book
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addBookToUser(
      title: String!
    ): User
  }
`
// allBooks(genre: String author: String): [Book]

const resolvers = {
  Author: {
    //bookCount: (root) => books.filter(i => i.author === root.name).length
    bookCount: (root) => Book.find({author: root.id }).countDocuments()
  },
  Book: {
    author: async (root) => {
      const book = await Book.findOne({title: root.title}).populate('author')
      return {
        name: book.author.name,
        born: book.author.born,
        id: book.author._id
      }
    }
  },
  Query: {
    //bookCount: () => books.length,
    bookCount: () => Book.collection.countDocuments(),
   // authorCount: () => authors.length,
    authorCount: () => Author.collection.countDocuments(),

    // regular allBooks:
    //allBooks: () => books,
    
    // allBooks with author:
    // allBooks: (root, args) => books.filter(b => b.author === args.author),

    //allBooks with genre
    // allBooks: (root, args) => {
    //   const findAuthor = (b) => b.author === args.author
    //   const findGenre = (g) => g === args.genre

    //     if (args.author && args.genre) {return books.filter(b => findAuthor(b) && b.genres.find(g => findGenre(g)))}
    //     if (args.author && !args.genre) {return books.filter(b => findAuthor(b))}
    //     if (args.genre && !args.author) {return books.filter(b =>b.genres.find(g => findGenre(g)))}
    // },

    // allBooks with Mongoose:
    allBooks: () => Book.find({}),

    // traditional author array:
    // allAuthors: () => authors,

    // allAuthors with Mongoose:
    allAuthors: () => Author.find({}),
    findAuthor: (root, args) => Author.findOne({name: args.name}),
    me: (root, args, context) => {
      console.log(context)
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, {currentUser}) => {
      // if (books.find(b => b.title === args.title)) {
      //   throw new UserInputError('Title already exists', {
      //     invalidArgs: args.title,
      //   })
      //   }
      //const book = {... args, id: uuid()}
      //books = books.concat(book)
      // const author = {name: args.author, id: uuid()}
      // authors = authors.concat(author)
      // return book

      // Mongoose, with author object ID
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const authorExists = await Author.findOne({name: args.author})
      const authorField = authorExists
      ? authorExists.id
      : (await new Author({name: args.author}).save()).id
      const book = new Book({... args, author: authorField})
      //return book.save()
      const bookExists = await Book.findOne({title: args.title})
      if (bookExists) {
        throw new UserInputError('Title already exists', {
           invalidArgs: args.title,
        })
      }
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      const bookNotAddedToUser = (book) => !currentUser.books.map(b => b._id).includes(book._id)
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      if (bookNotAddedToUser(book)) {
        currentUser.books = currentUser.books.concat(book)
        await currentUser.save()
      }
      return book
    },
    editAuthor: async (root, args, {currentUser}) => {
      //const author = authors.find(a => a.name === args.name)
      //if (!author) {return null}

      // const updatedAuthor = {...author, born: args.setBornTo}
      // authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      // return updatedAuthor
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({name: args.name})
      author.born = args.setBornTo
      //return author.save()
      try {
        author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    editBook: async (root, args) => {
        const book = await Book.findOne({title: args.title})
        const authorId = (await Author.findOne({name: book.author}))._id
        book.author = authorId
        book.save()
        return book
    },
    createUser: async (root, args) => {
      const user = new User({username: args.username})
      return user.save()
      .catch (error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if (!user || args.password !== secret) {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return {value: jwt.sign(userForToken, secret)}
    },
    addBookToUser: async (root, args, {currentUser}) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const book = await Book.findOne({title: args.title})
      const bookNotAdded = (book) => !currentUser.books.map(b => b._id).includes(book._id)
      if (bookNotAdded(book)) {
        currentUser.books = currentUser.books.concat(book)
        await currentUser.save()
      }
      else {throw new UserInputError('book is already added to user')}
      
      return currentUser
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), secret
      )
      const currentUser = await User.findById(decodedToken.id).populate('books')
      return {currentUser}
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})