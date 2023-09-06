import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="centered-view">
      <div className="centered-container">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
