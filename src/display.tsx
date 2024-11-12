import React from "react";
import ReactDOM from "react-dom/client";
import DisplayWindow from "./window/DisplayWindow";


ReactDOM.createRoot(document.getElementById("display-root") as HTMLElement).render(
  <React.StrictMode>
    <DisplayWindow />
  </React.StrictMode>,
);
