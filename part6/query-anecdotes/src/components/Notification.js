import { NotificationContext } from "../contexts/NotificationContext";
import { useContext, useEffect, useState } from "react";
const Notification = () => {
  const { notifications } = useContext(NotificationContext);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  if (notifications) {
    return <div style={style}>{notifications} </div>;
  } else {
    return <div> </div>;
  }
};

export default Notification;
