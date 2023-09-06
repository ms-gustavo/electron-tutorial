import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="centered-view">
      <div className="centered-container">
        <RegisterForm />
        <small className="form-text text-muted mt-2">
          Already registered?
          <span
            onClick={() => {
              navigate("/");
            }}
            className="btn-link ml-2"
          >
            Login
          </span>
        </small>
      </div>
    </div>
  );
};

export default Register;
