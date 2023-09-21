import React, { useState } from "react";

export default function Messenger({ onSubmit }) {
  const [value, setValue] = useState("");

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <div className="chat-input form-group mt-3 mb-0">
      <textarea
        onKeyDown={onKeyPress}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="form-control"
        rows="3"
        placeholder="Type your message here..."
      ></textarea>
    </div>
  );
}
