import React from "react";
import { withBaseLayout } from "../layouts/Base";
import ChatCreateForm from "../components/forms/ChatCreateForm";

function ChatCreate() {
  return (
    <div className="centered-view">
      <div className="centered-container">
        <ChatCreateForm />
      </div>
    </div>
  );
}

export default withBaseLayout(ChatCreate, { canGoBack: true });
