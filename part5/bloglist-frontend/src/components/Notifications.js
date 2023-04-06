import React from "react";

const Notifications = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div>{message}</div>;
};

export default Notifications;
