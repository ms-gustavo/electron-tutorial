import React from "react";

export default function App() {
  const title = "oi";
  const enhancedTitle = title + " - React App!";

  const sendNotification = () => {
    window.sendNotification("This is my custom message!");
  };

  return (
    <>
      <h1>{enhancedTitle}</h1>
      <button onClick={sendNotification}>Send Notification</button>
    </>
  );
}
