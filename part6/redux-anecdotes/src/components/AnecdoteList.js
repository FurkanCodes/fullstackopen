import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteSlice";
import {
  setNotification,
  removeNotification,
  setVoted,
} from "../reducers/notificationSlice";

import Notification from "./Notification";

const AnecdoteList = () => {
  // const [voted, setVoted] = useState(false);
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.anecdoteFilter.filter);
  const anecdotes = useSelector((state) => state.anecdotesSlice);
  const voted = useSelector((state) => state.notificationSlice.voted);
  let slicedAnecdotes = anecdotes.slice();
  const byVotes = (b1, b2) => parseFloat(b2.votes) - parseFloat(b1.votes);
  const vote = (id, content) => {
    dispatch(setVoted(true));
    dispatch(addVote(id));
    dispatch(setNotification("YOU VOTED" + " '" + content + "'"));
    setInterval(() => {
      dispatch(removeNotification());
      dispatch(setVoted(false));
    }, 4000);
    dispatch(setVoted(false));
  };
  return (
    <div>
      {" "}
      <h2>Anecdotes</h2>
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
