import React from "react";
import ReactDOM from "react-dom/client";
import { migrate } from "./db/migrate";
import './index.css';
// import { appDataDir, appLocalDataDir } from "@tauri-apps/api/path";
import MainWindow from "./windows/MainWindow";

// (async function () {
//   try {
//     await migrate()

//     const appLocalDirPath = await appLocalDataDir();
//     const appDataDirPath = await appDataDir();
//     console.log(`Local Directory path`, appLocalDirPath);
//     console.log(`App Data Directory path`, appDataDirPath);
//   } catch (error) {
//     console.log(error)
//     console.error(error)
//   }
// })();

await migrate()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MainWindow />
  </React.StrictMode>,
);
