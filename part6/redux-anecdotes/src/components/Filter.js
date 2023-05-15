import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeInputValue,
  selectInputValue,
  setFilter,
} from "../reducers/filterSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.anecdoteFilter.filter);

  // const handleChange = (e) => {
  //   let input = changeInputValue(e.target.value);
  //   dispatch(input);
  // };

  return (
    <div>
      {" "}
      <div>
        <h2>filter</h2>{" "}
        <input
          type="text"
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Filter;
