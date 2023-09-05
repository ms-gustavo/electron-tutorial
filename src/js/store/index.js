import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

export default function initStore() {
  const middlewares = [thunkMiddleware];

  const store = configureStore(
    {
      reducer: (state) => {
        return {
          message: "Hello World",
          data1: "just some testing data",
          data2: "just some testing data2",
        };
      },
    },
    applyMiddleware(...middlewares)
  );
  return store;
}
