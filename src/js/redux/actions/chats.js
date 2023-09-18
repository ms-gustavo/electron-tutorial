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

export const createChats = (formData, userId) => (dispatch) => {
  console.log(formData);
  console.log(userId);
  const useRef = db.doc(`profiles/${userId}`);
  const newChat = { ...formData, admin: useRef, joinedUsers: [useRef] };

  return api
    .createChat(newChat)
    .then((_) => dispatch({ type: "CHATS_CREATE_SUCCESS" }));
};
