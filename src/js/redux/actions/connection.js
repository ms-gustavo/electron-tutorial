import * as api from "../../api/connection";
import { types } from "../types";

export const checkUserConnection = (uid) => (dispatch) =>
  api.onConnectionChanged((isConnected) => {
    api.setUserOnlineStatus(uid, isConnected);

    dispatch({ type: types.CONNECTION_USER_STATUS_CHANGED });
  });
