import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote, newAnecdote } from "../reducers/anecdoteSlice";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.anecdoteFilter.filter);
  const anecdotes = useSelector((state) => state.anecdotesSlice);

  const dispatch = useDispatch();
  let slicedAnecdotes = anecdotes.slice();
  const byVotes = (b1, b2) => parseFloat(b2.votes) - parseFloat(b1.votes);

  return (
    <div>
      {" "}
      <h2>Anecdotes</h2>
      {slicedAnecdotes
        .sort(byVotes)
        .filter((a) => a.content.includes(filter))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(addVote(anecdote.id))}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
