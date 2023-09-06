import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";

const Welcome = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const optInText = isLoginView
    ? ["Not registered yet?", "Register"]
    : ["Already registered?", "Login"];

  return (
    <div className="centered-view">
      <div className="centered-container">
        {isLoginView ? <LoginForm /> : <RegisterForm />}
        <small className="form-text text-muted mt-2">
          {optInText[0]}
          <span
            onClick={() => setIsLoginView(!isLoginView)}
            className="btn-link ml-2"
            style={{ cursor: "pointer" }}
          >
            {optInText[1]}
          </span>
        </small>
      </div>
    </div>
  );
};

export default Welcome;
