import React from "react";

export const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        notifications: [action.payload, state.notifications],
      };
    case "REMOVE_NOTIFICATION":
      return {
        notifications: (action.payload = ""),
      };

    default:
      return state;
  }
};

export default NotificationReducer;
