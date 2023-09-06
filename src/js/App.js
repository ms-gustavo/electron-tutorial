import React from "react";

import { Provider } from "react-redux";

import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Settings from "./views/Settings";
import Login from "./views/Login";
import Chat from "./views/Chat";

import initStore from "./redux/store";
const store = initStore();
export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="content-wrapper">
          <Routes>
            <Route path="/settings" element={<Settings />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}
