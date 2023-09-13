import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { listenToAuthChanges } from "./redux/actions/auth";
import StoreProvider from "./redux/store/StoreProvider";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Settings from "./views/Settings";
import Welcome from "./views/Welcome";
import Chat from "./views/Chat";
import LoadingView from "./components/shared/LoadingView";

function AuthRoute({ children }) {
  const user = useSelector(({ auth }) => auth.user);

  return user ? children : <Navigate to="/" />;
}

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
          <Route
            path="/chat/:id"
            element={
              <AuthRoute>
                <Chat />
              </AuthRoute>
            }
          />
          <Route
            path="/home"
            element={
              <AuthRoute>
                <Home />
              </AuthRoute>
            }
          />
          <Route path="/settings" element={<Settings />} />
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
