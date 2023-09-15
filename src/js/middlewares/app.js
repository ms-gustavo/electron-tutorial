export default (store) => (next) => (action) => {
  const state = store.getState();

  switch (action.type) {
    case "APP_IS_ONLINE":
    case "APP_IS_OFFLINE": {
      alert("Displaying notification");
    }
  }
  next(action);
};
