import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/auth";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const error = useSelector(({ auth }) => auth.login.error);
  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="centered-container-form"
      >
        <div className="header">Welcome here!</div>
        <div className="subheader">Login and chat with other people!</div>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              {...register("email", {
                required: "Required",
              })}
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              {...register("password", {
                required: "Required",
              })}
              type="password"
              name="password"
              className="form-control"
              id="password"
            />
          </div>
          {error && (
            <div className="alert alert-danger small">{error.message}</div>
          )}
          <button type="submit" className="btn btn-outline-primary">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
