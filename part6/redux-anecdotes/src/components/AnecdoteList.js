import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote, newAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((a) => a.content.includes(filter.value))
  );
  console.log(filter.value);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(addVote(id));
  };
  const byVotes = (b1, b2) => b2.votes - b1.votes;
  return (
    <div>
      {" "}
      <h2>Anecdotes</h2>
      {anecdotes.sort(byVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
