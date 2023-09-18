import * as api from "../../api/chats";
import db from "../../db/firestore";

export const fetchChats = () => (dispatch) => {
  api.fetchChats().then((chats) =>
    dispatch({
      type: "CHATS_FETCH_SUCCESS",
      chats,
    })
  );
};

export const createChats = (formData, userId) => async (dispatch) => {
  const newChat = { ...formData, admin: db.doc(`profiles/${userId}`) };

  const chatId = await api.createChat(newChat);
  dispatch({ type: "CHATS_CREATE_SUCCESS" });
  await api.joinChat(userId, chatId);
  dispatch({ type: "CHATS_JOIN_SUCCESS" });
  return chatId;
};

// https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png
