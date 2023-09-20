import { combineReducers } from "redux";
import { createAction, createReducer } from "@reduxjs/toolkit";

function createChatReducer() {
  const joined = (state = [], action) => {
    switch (action.type) {
      case "CHATS_FETCH_RESTART":
        return [];
      case "CHATS_FETCH_SUCCESS":
        return action.joined;
      case "CHAT_JOIN_SUCCESS":
        return [...state, action.chat];
      default: {
        return state;
      }
    }
  };

  const available = (state = [], action) => {
    switch (action.type) {
      case "CHATS_FETCH_RESTART":
        return [];
      case "CHATS_FETCH_SUCCESS":
        return action.available;
      case "CHAT_JOIN_SUCCESS":
        return state.filter((chat) => chat.id !== action.chat.id);
      default: {
        return state;
      }
    }
  };
  const setChatsActive = createAction("CHATS_SET_ACTIVE_CHAT");
  const setUpdateUserState = createAction("CHATS_UPDATE_USER_STATE");

  const activeChats = createReducer({}, (builder) => {
    builder.addCase(setChatsActive, (state, action) => {
      const { chat } = action;
      state[chat.id] = chat;
    }),
      builder.addCase(setUpdateUserState, (state, action) => {
        const { user, chatId } = action;
        const joinedUsers = state[chatId].joinedUsers;
        const index = joinedUsers.findIndex(
          (jUsers) => jUsers.uid === user.uid
        );

        if (index < 0) {
          return state;
        }
        if (joinedUsers[index].state === user.state) {
          return state;
        }

        joinedUsers[index].state = user.state;
      });
  });

  return combineReducers({
    joined,
    available,
    activeChats,
  });
}

export default createChatReducer();
