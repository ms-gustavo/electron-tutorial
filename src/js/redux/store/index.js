import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import chatReducer from "../reducers/chats";
import authReducer from "../reducers/auth";
import appReducer from "../reducers/app";

export default function initStore() {
  const middlewares = [thunkMiddleware];

  const store = configureStore({
    reducer: {
      chats: chatReducer,
      auth: authReducer,
      app: appReducer,
    },
    middleware: [...middlewares],
  });

  return store;
}
