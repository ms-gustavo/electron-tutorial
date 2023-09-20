import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChatUsersLists from "../components/ChatUsersList";
import ViewTitle from "../components/shared/ViewTitle";
import ChatMessagesList from "../components/ChatMessagesList";
import { withBaseLayout } from "../layouts/Base";
import { subscribeToChat } from "../redux/actions/chats";

function Chat() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const activeChat = useSelector(({ chats }) => {
    console.log(chats);
    console.log("chats.activeChats[id]", chats.activeChats[id]);
    return chats.activeChats[id];
  });
  console.log("activeChat", activeChat);

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id));

    return () => {
      unsubFromChat();
    };
  }, []);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUsersLists />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Joined channel: ${id}`} />
        <ChatMessagesList />
      </div>
    </div>
  );
}

export default withBaseLayout(Chat, { canGoBack: true });
