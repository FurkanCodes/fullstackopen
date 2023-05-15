import { configureStore } from "@reduxjs/toolkit";
import anecdoteSliceReducer from "./reducers/anecdoteSlice";
import filterSliceReducer from "./reducers/filterSlice";
export default configureStore({
  reducer: {
    anecdotesSlice: anecdoteSliceReducer,
    anecdoteFilter: filterSliceReducer,
  },
});
