import React, { createContext, useReducer } from "react";
import { NotificationReducer } from "./NotificationReducer";

const initialState = {
  notifications: "",
};
export const NotificationContext = createContext(initialState);

export const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(NotificationReducer, initialState);
  const addNotification = (notification) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: notification,
    });

    console.log(notification);
  };

  const removeNotification = (notification) => {
    dispatch({
      type: "REMOVE_NOTIFICATION",
      payload: notification,
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications: state.notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
