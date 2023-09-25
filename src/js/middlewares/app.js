import { types } from "../redux/types";
import Notification from "../utils/notifications";
import Storage from "../utils/storage";

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
    case types.SETTINGS_UPDATE: {
      const { setting, value } = action;
      const currentSettings = Storage.getItem("app-settings");

      const settings = { ...currentSettings, [setting]: value };
      Storage.setItem("app-settings", settings);
    }
  }
  next(action);
};
