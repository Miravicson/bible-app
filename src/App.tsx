import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

import { db } from "./db/database";
import * as schema from "./db/schema";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState<{ id: number; name: string | null }[]>([]);

  

  async function addUser() {
    await db.insert(schema.users).values({ name });
    setName("");
    loadUsers();
  }

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  const loadUsers = async () => {
    db.query.users
      .findMany()
      .execute()
      .then((results) => {
        console.log("🚀 ~ FindMany response from Drizzle:", results);
        setUsers(results);
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
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <br/>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          addUser();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          value={name}
          placeholder="Enter a name..."
        />
        <button type="submit">Add name to the db</button>
      </form>
      <p>      List of users form the sqlite database:
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul></p>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
