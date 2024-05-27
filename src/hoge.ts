import { getBooks } from "./repository/getBooks";

const books = getBooks();

books.then((resutls) => {
  console.log(resutls)
})