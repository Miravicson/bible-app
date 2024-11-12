import { db } from "@/db/database";
import * as schema from "../db/schema";


  export async function addUser(name: string) {
    await db.insert(schema.users).values({ name  });
    loadUsers();
  }


  export async function loadUsers() {
    db.query.users
      .findMany()
      .execute()
      .then((results) => {
        console.log("🚀 ~ FindMany response from Drizzle:", results);
      });
  };

  export async function loadASingleUser() {
  db.query.users
    .findFirst()
    .execute()
    .then((result) => {
      console.log("🚀 ~ FindFirst response from Drizzle:", result);
    });
}