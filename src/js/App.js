import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import StoreProvider from "./redux/store/StoreProvider";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Settings from "./views/Settings";
import Welcome from "./views/Welcome";
import Chat from "./views/Chat";

import { listenToAuthChanges } from "./redux/actions/auth";
import RegisterForm from "./components/forms/RegisterForm";
import LoadingView from "./components/shared/LoadingView";

const ContentWrapper = ({ children }) => (
  <div className="content-wrapper">{children}</div>
);

function ChatApp() {
  const dispatch = useDispatch();
  const isChecking = useSelector(({ auth }) => auth.isChecking);

  useEffect(() => {
    dispatch(listenToAuthChanges());
  }, [dispatch]);

  if (isChecking) {
    return <LoadingView />;
  }

  return (
    <Router>
      <Navbar />
      <ContentWrapper>
        <Routes>
          <Route path="/settings" element={<Settings />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </ContentWrapper>
    </Router>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <ChatApp />
    </StoreProvider>
  );
}
