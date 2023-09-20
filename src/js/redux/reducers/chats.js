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

  const activeChats = createReducer({}, (builder) => {
    builder.addCase(setChatsActive, (state, action) => {
      const { chat } = action;
      state[chat.id] = chat;
    });
  });

  return combineReducers({
    joined,
    available,
    activeChats,
  });
}

export default createChatReducer();
