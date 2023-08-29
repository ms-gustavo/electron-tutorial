import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("electronChat");
const root = ReactDOM.createRoot(rootElement);

// Use root to render your app
root.render(<App />);
