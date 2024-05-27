import { DB } from "kysely-codegen";
import { db } from "./database";

// bookのseed定義
const book1 = {
  id: "0",
  title: "The Awakening",
  author: "Kate Chopin",
};

const book2 = {
  id: "1",
  title: "City of Glass",
  author: "Paul Auster",
};

const book3 = {
  id: "2",
  title: "Sentiment Analysis",
  author: "tanaka",
};

const book4 = {
  id: "3",
  title: "Emotion Analysis",
  author: "suzuki",
};

// userのseed定義
const user1 = {
  id: "0",
  name: "user0",
};

const users = [user1]

// const bookshelf_item = {
//   book_id: "1",
//   user_id: "0" ,
//   review_text: "とても面白かった！！！",
//   reading_status: 
// }


const books = [book1, book2, book3, book4];

async function seed() {
  // const rBooks = books.map((book) => ({ ...book, authers: undefined }));

  const tables = (await db.introspection.getTables()).map(
    (t) => t.name as keyof DB
  );

  await Promise.all(tables.map((t) => db.deleteFrom(t as keyof DB).execute()));

  await db.insertInto("book").values(books).execute();
  await db.insertInto("user").values(users).execute();

  await db.destroy();
}

seed();
