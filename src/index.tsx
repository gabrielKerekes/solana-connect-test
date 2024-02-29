import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import TrezorConnect from "@trezor/connect-web";

// polyfill buffer
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;

TrezorConnect.init({
  lazyLoad: true,
  // connectSrc: "https://localhost:8088/",
  // iframeSrc: "https://localhost:8088/",
  manifest: {
    email: "john.bool.bool@gmail.com",
    appUrl: "localhost",
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
