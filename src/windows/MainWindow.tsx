import { invoke } from '@tauri-apps/api/core';
import { useEffect } from 'react';
import { Routes } from '@/routes';
import { GlobalContextProvider } from '@/context/context';

// function MainWindowOld() {

//   const [books, setBooks] = useState<DefaultBibleBook[]>([]);

//   useEffect(() => {
//     async function fetchUsers() {
//       const books = await getBibleBooks();
//       setBooks(books);
//     }

//     fetchUsers()
//   }, [])

//   async function openDisplay() {
//     await invoke("open_display_window",);
//   }

//   async function sendMessageToDisplay() {
//     const message = "Hello from main";
//     await invoke('send_message_to_display', {message} )
//   }

//   return (
//     <main className="flex flex-col items-center justify-center h-[100vh] space-y-4">
//       <h3 className="text-2xl font-thin tracking-tight">Welcome to Scripture Spotter</h3>
//       <Button variant="default" onClick={openDisplay}>Open Display</Button>
//       <Button variant="default" onClick={sendMessageToDisplay}>Send Message To Display</Button>
//       <p>Users</p>
// <div className="flex flex-wrap space-x-2">
//         {
//           books.map((book) => (
//             <li key={book.bookNumber} className="inline-block">{book.book}</li>
//           ))
//         }
// </div>
//     </main>
//   );
// }

function MainWindow() {
  async function openDisplay() {
    await invoke('open_display_window');
  }

  useEffect(() => {
    openDisplay();
  }, []);
  return (
    <GlobalContextProvider>
      <Routes />
    </GlobalContextProvider>
  );
}

export default MainWindow;
