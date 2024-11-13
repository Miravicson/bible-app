import { invoke } from "@tauri-apps/api/core";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { loadUsers } from "@/api/users";
import { DefaultBibleBook, User } from "@/api/types";
import { getBibleBooks } from "@/api/bible";


function MainWindow() {

  const [books, setBooks] = useState<DefaultBibleBook[]>([]);


  useEffect(() => {
    async function fetchUsers() {
      const books = await getBibleBooks();
      setBooks(books);
    }

    fetchUsers()
  }, [])


  async function openDisplay() {
    await invoke("open_display_window",);
  }


  return (
    <main className="flex flex-col items-center justify-center h-[100vh] space-y-4">
      <h3 className="text-2xl font-thin tracking-tight">Welcome to Scripture Spotter</h3>
      <Button variant="default" onClick={openDisplay}>Open Display</Button>
      <p>Users</p>
<div className="flex flex-wrap space-x-2">
        {
          books.map((books) => (
            <li className="inline-block">{books. book}</li>
          ))
        }
</div>
    </main>
  );
}

export default MainWindow;
