import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { db } from "../db/database";
// import * as schema from "../db/schema";

function MainWindow() {


  

  // async function addUser() {
  //   await db.insert(schema.users).values({ name });
  //   loadUsers();
  // }


  async function openDisplay() {
    await invoke("open_display_window");
  }

  const loadUsers = async () => {
    db.query.users
      .findMany()
      .execute()
      .then((results) => {
        console.log("🚀 ~ FindMany response from Drizzle:", results);
      });
  };

  const loadASingleUser = async () => {
    db.query.users
      .findFirst()
      .execute()
      .then((result) => {
        console.log("🚀 ~ FindFirst response from Drizzle:", result);
      });
  };

  useEffect(() => {
    async function init() {
      loadUsers();
      loadASingleUser();
    }
    init();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-[100vh]">
      <h1>Welcome to Scripture Spotter</h1>
      <button className="bg-green-400 text-white rounded-md px-3 py-1" onClick={openDisplay}>Open Display</button>
    </main>
  );
}

export default MainWindow;
