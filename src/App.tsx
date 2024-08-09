import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Homepage } from "./Homepage";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Homepage />
    </RecoilRoot>
  );
}

export default App;
