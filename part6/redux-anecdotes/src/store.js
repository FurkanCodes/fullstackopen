import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterSliceReducer from "./reducers/filterSlice";
export default configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    anecdoteFilter: filterSliceReducer,
  },
});
