import { db } from "@/db/database";
import {users as usersSchema} from "@/db/schema";


  export async function addUser(name: string) {
    await db.insert(usersSchema).values({ name  });
    loadUsers();
  }


  export async function loadUsers() {
    const result = await db.query.users
      .findMany()
      .execute();
      console.log("🚀 ~ FindMany response from Drizzle:", result);
      return result;
  };

  export async function loadASingleUser() {
  db.query.users
    .findFirst()
    .execute()
    .then((result) => {
      console.log("🚀 ~ FindFirst response from Drizzle:", result);
    });
}