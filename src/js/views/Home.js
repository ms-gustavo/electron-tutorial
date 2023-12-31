import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../redux/actions/chats";
import AvailableChatsList from "../components/AvailableChatsList";
import ViewTitle from "../components/shared/ViewTitle";
import JoinedChatsList from "../components/JoinedChatsList";
import { withBaseLayout } from "../layouts/Base";
import notifications from "../utils/notifications";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(({ auth }) => auth.user);
  const joinedChats = useSelector(({ chats }) => {
    return chats.joined;
  });
  const availableChats = useSelector(({ chats }) => {
    return chats.available;
  });
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    notifications.setup();
    dispatch(fetchChats());
  }, []);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatsList chats={joinedChats} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text="Choose your channel">
          <Link className="btn btn-outline-primary" to="/chatcreate">
            New
          </Link>
        </ViewTitle>
        <AvailableChatsList chats={availableChats} />
      </div>
    </div>
  );
}

export default withBaseLayout(Home);
