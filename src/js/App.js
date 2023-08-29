import React from "react";

export default function App() {
  const title = "oi";
  const enhancedTitle = title + " - React App!";

  const sendNotification = () => {
    electron.notificationApi.sendNotification("My custom message again!");
  };

  return (
    <>
      <h1>{enhancedTitle}</h1>
      <button onClick={sendNotification}>Send Notification</button>
    </>
  );
}
