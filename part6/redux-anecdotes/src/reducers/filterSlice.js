import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filter: "",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

// const filterReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "CHANGE_INPUT":
//       return {
//         ...state,
//         value: action.payload,
//       };

//     // other cases ...
//     default:
//       return state;
//   }
// };
// export const CHANGE_INPUT = "CHANGE_INPUT";
// export const changeInputValue = (value) => {
//   return {
//     type: "CHANGE_INPUT",
//     payload: value,
//   };
// };
// export const selectInputValue = (state) => state.value;

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
