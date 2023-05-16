import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: "",
    voted: false,
  },
  reducers: {
    setNotification: (state, action) => {
      console.log(action.payload);
      state.notification = action.payload;
    },
    removeNotification: (state) => {
      state.notification = "";
    },
    setVoted: (state) => {
      state.voted = true;
    },
  },
});

export const { setNotification, removeNotification, setVoted } =
  notificationSlice.actions;
export default notificationSlice.reducer;
