import React from "react";

function Notification({ message, messageToggle }) {
  if (message === null) {
    return null;
  }
  if (messageToggle === true) {
    return <div className="success">{message}</div>;
  } else {
    return <div className="error">{message}</div>;
  }
}

export default Notification;
