import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  voteAnecdote,
  addVote,
  initAnecdotes,
} from "../reducers/anecdoteSlice";
import { createNotification } from "../reducers/notificationSlice";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initAnecdotes());
  }, [dispatch]);
  const filter = useSelector((state) => state.anecdoteFilter.filter);
  const anecdotes = useSelector((state) => state.anecdotesSlice);

  let slicedAnecdotes = anecdotes.slice();
  const byVotes = (b1, b2) => parseFloat(b2.votes) - parseFloat(b1.votes);
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(createNotification(`You voted '${anecdote.content}'`, 5));
  };
  return (
    <div>
      {" "}
      {slicedAnecdotes
        .sort(byVotes)
        .filter((a) => a.content.includes(filter))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
