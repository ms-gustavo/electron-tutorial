import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const rootElement = document.getElementById("chatApp");
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
