import React from "react";
import { useParams } from "react-router-dom";
import ChatUsersLists from "../components/ChatUsersList";
import ViewTitle from "../components/shared/ViewTitle";
import ChatMessagesList from "../components/ChatMessagesList";
import BaseLayout from "../layouts/Base";

export default function Chat() {
  const { id } = useParams();

  return (
    <BaseLayout canGoBack>
      <div className="row no-gutters fh">
        <div className="col-3 fh">
          <ChatUsersLists />
        </div>
        <div className="col-9 fh">
          <ViewTitle text={`Joined channel: ${id}`} />
          <ChatMessagesList />
        </div>
      </div>
    </BaseLayout>
  );
}
