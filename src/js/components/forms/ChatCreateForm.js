import React from "react";
import { useForm } from "react-hook-form";

const ChatCreateForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
