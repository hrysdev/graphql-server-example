import { DB, Book, User } from "kysely-codegen";
import { db } from "../database";

export async function getBooks() {
  const books: Book[] = await db.selectFrom("book").selectAll().execute();
  await db.destroy();
  return books
}
