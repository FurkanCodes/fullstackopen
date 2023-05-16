import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteSlice";
import { createNotification } from "../reducers/notificationSlice";

import Notification from "./Notification";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.anecdoteFilter.filter);
  const anecdotes = useSelector((state) => state.anecdotesSlice);
  const voted = useSelector((state) => state.notificationSlice.voted);
  let slicedAnecdotes = anecdotes.slice();
  const byVotes = (b1, b2) => parseFloat(b2.votes) - parseFloat(b1.votes);
  const vote = (id, content) => {
    dispatch(addVote(id));
    dispatch(createNotification(`You voted '${content}'`, 5));
  };
  return (
    <div>
      {" "}
      {voted == true && <Notification />}
      {slicedAnecdotes
        .sort(byVotes)
        .filter((a) => a.content.includes(filter))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
