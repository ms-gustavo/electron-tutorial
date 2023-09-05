import React from "react";
import ChatUsersLists from "../components/ChatUsersList";
import { ViewTitle } from "../components/shared/ViewTitle";
import ChatMessagesList from "../components/ChatMessagesList";

export default function Chat() {
  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUsersLists />
      </div>
      <div className="col-9 fh">
        <ViewTitle />
        <ChatMessagesList />
      </div>
    </div>
  );
}
