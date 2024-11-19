import React from "react";
import ReactDOM from "react-dom/client";
import DisplayWindow from "./windows/DisplayWindow";
import './index.css';
import './App.css';


ReactDOM.createRoot(document.getElementById("display-root") as HTMLElement).render(
  <React.StrictMode>
    <DisplayWindow />
  </React.StrictMode>,
);
