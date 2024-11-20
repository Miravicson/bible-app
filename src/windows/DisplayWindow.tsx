import Screen from "@/components/display/screen";
import { Scripture } from "@/lib/types";
import { listen } from "@tauri-apps/api/event";
import { useEffect, useState } from "react";

function DisplayWindow(){

  const [scripture, setScripture] = useState<Scripture | null>(null);

  useEffect(() => {
    const unlisten = listen<Scripture>('show_scripture', (event) => {
      console.log(`Message received: ${JSON.stringify(event)}`);
      const scripture = event.payload;
      setScripture(scripture);
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  return <Screen scripture={scripture} />;
}

export default DisplayWindow;
