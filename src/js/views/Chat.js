import React, { useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  subscribeToChat,
  subscribeToProfile,
  subscribeToMessage,
  sendChatMessage,
  registerMessageSubscription,
} from "../redux/actions/chats";
import { withBaseLayout } from "../layouts/Base";
import ChatUsersLists from "../components/ChatUsersList";
import ViewTitle from "../components/shared/ViewTitle";
import ChatMessagesList from "../components/ChatMessagesList";
import LoadingView from "../components/shared/LoadingView";
import Messenger from "../components/Messenger";

function Chat() {
  const { id } = useParams();
  const peopleWatchers = useRef({});
  const messageList = useRef();
  const dispatch = useDispatch();
  const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
  const messages = useSelector(({ chats }) => chats.messages[id]);
  const messagesSub = useSelector(({ chats }) => chats.messagesSubs[id]);
  const joinedUsers = activeChat?.joinedUsers;

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id));
    if (!messagesSub) {
      const unsubFromMessages = dispatch(subscribeToMessage(id));
      dispatch(registerMessageSubscription(id, unsubFromMessages));
    }
    return () => {
      unsubFromChat();
      unsubFromJoinedUsers();
    };
  }, []);

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers);
  }, [joinedUsers]);

  const subscribeToJoinedUsers = useCallback(
    (joinedUsers) => {
      joinedUsers.forEach((user) => {
        if (!peopleWatchers.current[user.uid]) {
          peopleWatchers.current[user.uid] = dispatch(
            subscribeToProfile(user.uid, id)
          );
        }
      });
    },
    [dispatch, id]
  );

  const sendMessage = useCallback(
    (message) => {
      dispatch(sendChatMessage(message, id)).then((_) =>
        messageList.current.scrollIntoView(false)
      );
    },
    [id]
  );

  const unsubFromJoinedUsers = useCallback(() => {
    Object.keys(peopleWatchers.current).forEach((id) =>
      peopleWatchers.current[id]()
    );
  }, [peopleWatchers.current]);

  if (!activeChat?.id) {
    return <LoadingView message="Loading Chat..." />;
  }

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUsersLists users={activeChat?.joinedUsers || []} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`${activeChat?.name}`} />
        <ChatMessagesList messages={messages} innerRef={messageList} />
        <Messenger onSubmit={sendMessage} />
      </div>
    </div>
  );
}

export default withBaseLayout(Chat, { canGoBack: true });
