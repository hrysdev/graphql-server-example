import { Kysely } from "kysely";

const ID = "varchar(30)";
const SMALL_VARVARCHAR = "varchar(30)";
const NORMAL_VARVARCHAR = "varchar(255)";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("book")
    .addColumn("id", ID, (col) => col.primaryKey())
    .addColumn("title", NORMAL_VARVARCHAR, (col) => col.notNull())
    .addColumn("author", NORMAL_VARVARCHAR, (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("user")
    .addColumn("id", ID, (col) => col.primaryKey())
    .addColumn("name", NORMAL_VARVARCHAR, (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("bookshelf_item")
    .addColumn("book_id", ID, (col) =>
      col.references("book.id").onDelete("cascade").notNull()
    )
    .addColumn("user_id", ID, (col) =>
      col.references("user.id").onDelete("cascade").notNull()
    )
    .addColumn("review_text", "text")
    .addColumn("reading_status", NORMAL_VARVARCHAR, (col) =>
      col.defaultTo("UNREAD")
    )
    .addPrimaryKeyConstraint("primary", ["book_id", "user_id"])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("bookshelf_item").execute();
  await db.schema.dropTable("user").execute();
  await db.schema.dropTable("book").execute();
}