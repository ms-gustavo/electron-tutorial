import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="centered-view">
      <div className="centered-container">
        <LoginForm />
        <small className="form-text text-muted mt-2">
          Not registered yet?
          <span
            onClick={() => {
              navigate("/register");
            }}
            className="btn-link ml-2"
          >
            Register
          </span>
        </small>
      </div>
    </div>
  );
};

export default Login;
