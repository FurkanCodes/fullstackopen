import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: "",
  },
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

let timeoutId = null;

export const createNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch(setNotification(message));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => dispatch(setNotification(null)), delay * 1000);
  };
};
export default notificationSlice.reducer;
