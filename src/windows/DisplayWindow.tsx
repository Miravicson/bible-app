import { listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";

function DisplayWindow() {

  const [message, setMessage] = useState("Scripture will be shown here!");

  useEffect(() => {
    const unlisten = listen<{message: string}>('message', (event) => {
      console.log(`Message received: ${event.payload.message}`);
      setMessage(event.payload.message);
    })

    return  () => {
      unlisten.then(f => f())
    };
  }, [])
  return (
    <main className="flex items-center justify-center h-screen bg-green-500">
      <h3 className="text-2xl font-thin tracking-tight text-white">{message}</h3>
    </main>
  )
}

export default DisplayWindow;