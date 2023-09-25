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
    case types.SETTINGS_UPDATE: {
      const { setting, value } = action;
      const currentSettings = localStorage.getItem("app-settings");
      const parsedCurrentSettings = currentSettings
        ? JSON.parse(currentSettings)
        : {};

      const settings = { ...parsedCurrentSettings, [setting]: value };
      const stringifiedSettings = JSON.stringify(settings);
      localStorage.setItem("app-settings", stringifiedSettings);
    }
  }
  next(action);
};
