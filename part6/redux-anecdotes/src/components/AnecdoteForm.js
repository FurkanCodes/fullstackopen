import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { newAnecdote, addNew } from "../reducers/anecdoteSlice";
import anecdoteService from "../services/anecdoteService";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.newAnecdote.value;
    console.log(content);
    event.target.newAnecdote.value = "";
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(addNew(newAnecdote));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
