import { types } from "../redux/types";
import Notification from "../utils/notifications";

export default (store) => (next) => (action) => {
  switch (action.type) {
    case types.APP_IS_ONLINE:
    case types.APP_IS_OFFLINE: {
      Notification.show({
        title: `Connection status:`,
        body: action.isOnline ? `Online` : `Offline`,
      });
    }
    case types.AUTH_LOGOUT_SUCCESS: {
      const { messagesSubs } = store.getState().chats;
      if (messagesSubs)
        Object.keys(messagesSubs).forEach((messageSub) =>
          messagesSubs[messageSub]()
        );
    }
  }
  next(action);
};
