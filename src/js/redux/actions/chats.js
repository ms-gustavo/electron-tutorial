import * as api from "../../api/chats";
import db from "../../db/firestore";
import { types } from "../types";

export const fetchChats = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  dispatch({ type: types.CHATS_FETCH_INIT });
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
    type: types.CHATS_FETCH_SUCCESS,
    ...sortedChats,
  });

  return sortedChats;
};
export const joinChats = (chat, userId) => (dispatch) =>
  api.joinChat(userId, chat.id).then((_) => {
    dispatch({ type: types.CHAT_JOIN_SUCCESS, chat });
  });

export const createChats = (formData, userId) => async (dispatch) => {
  const newChat = { ...formData, admin: db.doc(`profiles/${userId}`) };

  const chatId = await api.createChat(newChat);
  dispatch({ type: types.CHATS_CREATE_SUCCESS });
  await api.joinChat(userId, chatId);
  dispatch({
    type: types.CHATS_JOIN_SUCCESS,
    chat: { ...newChat, id: chatId },
  });
  return chatId;
};

export const subscribeToChat = (chatId) => (dispatch) =>
  api.subscribeToChat(chatId, async (chat) => {
    const joinedUsers = await Promise.all(
      chat.joinedUsers.map(async (userRef) => {
        const userSnapshot = await userRef.get();
        return userSnapshot.data();
      })
    );
    chat.joinedUsers = joinedUsers;

    dispatch({ type: types.CHATS_SET_ACTIVE_CHAT, chat });
  });

export const subscribeToProfile = (uid, chatId) => (dispatch) =>
  api.subscribeToProfile(uid, (user) => {
    dispatch({ type: types.CHATS_UPDATE_USER_STATE, user, chatId });
  });

export const subscribeToMessage = (chatId) => (dispatch) => {
  return api.subscribeToMessages(chatId, (messages) => {
    const chatMessages = messages.map((message) => {
      if (message.type === "added")
        return { id: message.doc.id, ...message.doc.data() };
    });

    dispatch({ type: types.CHATS_SET_MESSAGES, chatMessages, chatId });
    return chatMessages;
  });
};

export const sendChatMessage = (message, chatId) => (dispatch, getState) => {
  const newMessage = { ...message };
  const { user } = getState().auth;
  const userRef = db.doc(`profiles/${user.uid}`);
  newMessage.author = userRef;
  return api
    .sendChatMessage(newMessage, chatId)
    .then((_) => dispatch({ type: types.CHATS_MESSAGE_SENT }));
};
