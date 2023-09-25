import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withBaseLayout } from "../layouts/Base";
import { updateSettings } from "../redux/actions/settings";

function Settings() {
  const dispatch = useDispatch();
  const { isDarkTheme } = useSelector(({ settings }) => settings);

  const handleChange = ({ target: { checked, name } }) => {
    dispatch(updateSettings(name, checked));
  };

  return (
    <div className="centered-view">
      <div className="centered-container">
        <form className="centered-container-form">
          <div className="header">Adjust application settings</div>
          <div className="form-container">
            <div className="my-3">
              <div className="form-check">
                <input
                  checked={isDarkTheme}
                  onChange={handleChange}
                  name="isDarkTheme"
                  type="checkbox"
                  className="form-check-input"
                />
                <label className="form-check-label">Dark Theme</label>
              </div>
            </div>
            <button
              type="button"
              onClick={() => electron.appApi.quitApp()}
              className="btn btn-danger"
            >
              Quit App
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withBaseLayout(Settings, { canGoBack: true });
