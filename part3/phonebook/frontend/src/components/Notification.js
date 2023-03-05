import React from "react";

function Notification({ notificationType, message }) {
  if (message === null) {
    return null;
  }
  if (notificationType === "success") {
    return <div className="success">{message}</div>;
  } else {
    return <div className="error">{message}</div>;
  }
}

export default Notification;
