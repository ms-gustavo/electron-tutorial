import * as api from "../../api/chats";
import db from "../../db/firestore";

export const fetchChats = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  dispatch({ type: "CHATS_FETCH_INIT" });
  const chats = await api.fetchChats();

  chats.forEach(
    (chat) => (chat.joinedUsers = chat.joinedUsers.map((user) => user.id))
  );

  const sortedChats = chats.reduce(
    (accuChats, chat) => {
      accuChats[
        chat.joinedUsers.includes(user.uid) ? "joined" : "available"
      ].push(chat);
      return accuChats;
    },
    { joined: [], available: [] }
  );

  dispatch({
    type: "CHATS_FETCH_SUCCESS",
    ...sortedChats,
  });

  return sortedChats;
};

export const createChats = (formData, userId) => async (dispatch) => {
  const newChat = { ...formData, admin: db.doc(`profiles/${userId}`) };

  const chatId = await api.createChat(newChat);
  dispatch({ type: "CHATS_CREATE_SUCCESS" });
  await api.joinChat(userId, chatId);
  dispatch({ type: "CHATS_JOIN_SUCCESS" });
  return chatId;
};

export const joinChats = (chat, userId) => (dispatch) =>
  api.joinChat(userId, chat.id).then((_) => {
    dispatch({ type: "CHAT_JOIN_SUCCESS" });
  });
