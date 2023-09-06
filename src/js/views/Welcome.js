import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const user = useSelector(({ auth }) => auth.user);
  const isChecking = useSelector(({ auth }) => auth.isChecking);
  const navigate = useNavigate();
  const optInText = isLoginView
    ? ["Not registered yet?", "Register"]
    : ["Already registered?", "Login"];

  useEffect(() => {
    if (isChecking) {
      <h1>Loading...</h1>;
    }
  }, [isChecking]);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

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
