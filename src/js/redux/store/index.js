import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import chatReducer from "../reducers/chats";

export default function initStore() {
  const middlewares = [thunkMiddleware];

  const store = configureStore({
    reducer: {
      chats: chatReducer,
    },
    middleware: [...middlewares],
  });

  return store;
}
