import { configureStore } from "@reduxjs/toolkit";
import anecdoteSliceReducer from "./reducers/anecdoteSlice";
import filterSliceReducer from "./reducers/filterSlice";
import notificationSliceReducer from "./reducers/notificationSlice";
export default configureStore({
  reducer: {
    anecdotesSlice: anecdoteSliceReducer,
    anecdoteFilter: filterSliceReducer,
    notificationSlice: notificationSliceReducer,
  },
});
