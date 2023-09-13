import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/auth";
import BackButton from "./shared/BackButton";

export default function Navbar({ canGoBack, view }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          {canGoBack && <BackButton />}
          {view !== "Settings" && (
            <button
              onClick={() => navigate("/settings")}
              className="btn btn-outline-success ml-2"
            >
              Settings
            </button>
          )}
        </div>
        <div className="chat-navbar-inner-right">
          {user && (
            <>
              <img className="avatar mr-2" src={user.avatar}></img>
              <span className="logged-in-user">Hi {user.username}</span>
            </>
          )}
          {user && (
            <button
              onClick={async () => {
                await dispatch(logoutUser());
                navigate("/");
              }}
              className="btn btn-outline-danger ml-2"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
