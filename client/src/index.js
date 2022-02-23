import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { TokenContentProvider } from "./store/token-provider";
import { MusicContentProvider } from "./store/musicProvider";

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <MusicContentProvider>
      <TokenContentProvider>
        <App />
      </TokenContentProvider>
    </MusicContentProvider>
  </BrowserRouter>,
  /*</React.StrictMode>*/ document.getElementById("root")
);

