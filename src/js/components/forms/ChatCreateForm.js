import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createChats } from "../../redux/actions/chats";

const ChatCreateForm = () => {
  const [chatCreated, setChatCreated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (chatCreated) {
      navigate("/home");
    }
  }, [chatCreated, navigate]);

  const onSubmit = (data) => {
    dispatch(createChats(data, user.uid)).then((_) => setChatCreated(true));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="centered-container-form"
      >
        <div className="header">Create chat now!</div>
        <div className="subheader">Chat with people you now</div>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="name">Chat Name</label>
            <input
              {...register("name", {
                required: "Required",
              })}
              type="text"
              className="form-control"
              id="name"
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Chat Description</label>
            <textarea
              {...register("description", {
                required: "Required",
              })}
              name="description"
              className="form-control"
              id="description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Chat Image</label>
            <input
              {...register("image", {
                required: "Required",
              })}
              type="text"
              className="form-control"
              id="image"
              name="image"
            />
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default ChatCreateForm;
