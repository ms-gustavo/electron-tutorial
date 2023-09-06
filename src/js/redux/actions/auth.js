import * as api from "../../api/auth";

export const register = (formData) => (dispatch) =>
  api.register(formData).then((user) => {
    dispatch({
      type: "AUTH_REGISTER_SUCCESS",
    });
    return user;
  });
