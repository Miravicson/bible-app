import { db } from "@/db/database";

export async function getBibleBooks(){
  const books = await db.query.defaultBibleBooks.findMany().execute();
  return books;
}