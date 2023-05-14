import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeInputValue, selectInputValue } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const inputValue = useSelector(selectInputValue);
  const handleChange = (e) => {
    let input = changeInputValue(e.target.value);
    dispatch(input);
    console.log(changeInputValue(e.target.value).payload);
  };

  return (
    <div>
      {" "}
      <div>
        <h2>filter</h2>{" "}
        <input type="text" value={inputValue} onChange={handleChange} />
      </div>
    </div>
  );
};

export default Filter;
