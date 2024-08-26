import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "antd/dist/reset.css";
import App from "./App";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RecoilRoot>
    <App />
  </RecoilRoot>
  // </React.StrictMode>
);
