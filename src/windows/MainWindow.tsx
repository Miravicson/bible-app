import { invoke } from "@tauri-apps/api/core";
import { Button } from "@/components/ui/button"


function MainWindow() {


  async function openDisplay() {
    await invoke("open_display_window");
  }


  return (
    <main className="flex flex-col items-center justify-center h-[100vh] space-y-4">
      <h3 className="text-2xl font-thin tracking-tight">Welcome to Scripture Spotter</h3>
      <Button variant="default" onClick={openDisplay}>Open Display</Button>
    </main>
  );
}

export default MainWindow;
