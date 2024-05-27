import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// import { getBooks } from "./repository/getBooks";

const schema = loadSchemaSync("./schema.graphql", {
  loaders: [new GraphQLFileLoader()],
});

// // A schema is a collection of type definitions (hence "typeDefs")
// // that together define the "shape" of queries that are executed against
// // your data.
// const typeDefs = `#graphql
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book!],
//     firstbook: Book!
//   }
// `;

let books = [
  {
    id: "0",
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    id: "1",
    title: "City of Glass",
    author: "Paul Auster",
  },
];

// function generateNextId(preIndex: String) {
//   return String(Number(preIndex) + 1);
// }

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    selectBooks: (_, args: any) => {
      let searchBooks = [];
      for (let i = 0; i < books.length; i++) {
        if (books[i].id === args.input.id) {
          if (args.input.title === books[i].title) {
            searchBooks.push(books[i]);
          }
          if (args.input.author === books[i].author) {
            searchBooks.push(books[i]);
          }
          return searchBooks;
        }
      }
    },

    // 特定の書籍を取得
    // selectBook: (_, args: any) => {
    //   const books = getBooks();
    //   books.then((resutls) => {
    //     return resutls.find((book) => book.id === args.id);
    //   })
    // }
  }

  // Mutation: {
  //   addBook: (_, args: any) => {
  //     const lastBookId = books[books.length - 1].id;
  //     const nextBookId = generateNextId(lastBookId);
  //     const book = {
  //       id: nextBookId,
  //       title: args.input.title,
  //       author: args.input.author,
  //     };
  //     books.push(book);
  //     return books;
  //   },

    // updateBook: (_, args: any) => {
    //   for (let i = 0; i < books.length; i++) {
    //     if (books[i].id === args.input.id) {
    //       if (args.input.title !== "") {
    //         books[i].title = args.input.title;
    //       }
    //       if (args.input.author !== "") {
    //         books[i].author = args.input.author;
    //       }
    //       return books;
    //     }
    //   }
    // },

    // deleteBook: (_, args: any) => {
    //   for (let i = 0; i < books.length; i++) {
    //     if (books[i].id === args.id) {
    //       books.splice(i, 1);
    //       return books;
    //     }
    //   }
    // },
  // },
};

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ schema: schemaWithResolvers });

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
