import React from "react";
import { Provider } from "react-redux";
import initStore from "./index";
const store = initStore();

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
