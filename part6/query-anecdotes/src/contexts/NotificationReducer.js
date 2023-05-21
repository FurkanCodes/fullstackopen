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
    case "ADD_ERROR":
      return {
        errors: [action.payload, state.errors],
      };

    default:
      return state;
  }
};

export default NotificationReducer;
