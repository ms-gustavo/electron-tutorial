import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../redux/actions/chats";
import AvailableChatsList from "../components/AvailableChatsList";
import ViewTitle from "../components/shared/ViewTitle";
import JoinedChatsList from "../components/JoinedChatsList";
import BaseLayout from "../layouts/Base";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(({ auth }) => auth.user);
  const chats = useSelector(({ chats }) => chats.items);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchChats());
  }, []);

  return (
    <BaseLayout>
      <div className="row no-gutters fh">
        <div className="col-3 fh">
          <JoinedChatsList chats={chats} />
        </div>
        <div className="col-9 fh">
          <ViewTitle text="Choose your channel" />
          <AvailableChatsList chats={chats} />
        </div>
      </div>
    </BaseLayout>
  );
}
