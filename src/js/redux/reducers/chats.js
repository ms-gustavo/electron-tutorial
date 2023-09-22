import { combineReducers } from "redux";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { types } from "../types";

const setChatsActive = createAction(types.CHATS_SET_ACTIVE_CHAT);
const setUpdateUserState = createAction(types.CHATS_UPDATE_USER_STATE);
const setChatsMessages = createAction(types.CHATS_SET_MESSAGES);

function createChatReducer() {
  const joined = (state = [], action) => {
    switch (action.type) {
      case types.CHATS_FETCH_RESTART:
        return [];
      case types.CHATS_FETCH_SUCCESS:
        return action.joined;
      case types.CHAT_JOIN_SUCCESS:
        return [...state, action.chat];
      default: {
        return state;
      }
    }
  };

  const available = (state = [], action) => {
    switch (action.type) {
      case types.CHATS_FETCH_RESTART:
        return [];
      case types.CHATS_FETCH_SUCCESS:
        return action.available;
      case types.CHAT_JOIN_SUCCESS:
        return state.filter((chat) => chat.id !== action.chat.id);
      default: {
        return state;
      }
    }
  };

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

  const messages = createReducer({}, (builder) => {
    builder.addCase(setChatsMessages, (state, action) => {
      const previousMessages = state[action.chatId] || [];
      state[action.chatId] = [...previousMessages, ...action.messages];
    });
  });

  const messagesSubs = (state = {}, action) => {
    switch (action.type) {
      case types.CHATS_REGISTER_MESSAGE_SUB:
        return { ...state, [action.chatId]: action.sub };
      default:
        return state;
    }
  };

  return combineReducers({
    joined,
    available,
    activeChats,
    messages,
    messagesSubs,
  });
}

export default createChatReducer();
