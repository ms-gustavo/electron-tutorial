import React, { useEffect } from "react";

import { Provider } from "react-redux";

import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Settings from "./views/Settings";
import Welcome from "./views/Welcome";
import Chat from "./views/Chat";

import initStore from "./redux/store";
import { listenToAuthChanges } from "./redux/actions/auth";
import RegisterForm from "./components/forms/RegisterForm";
const store = initStore();
export default function App() {
  useEffect(() => {
    store.dispatch(listenToAuthChanges());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="content-wrapper">
          <Routes>
            <Route path="/settings" element={<Settings />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/" element={<Welcome />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}
