import { createAnecdote } from "./requests";
import { useMutation, useQueryClient } from "react-query";
import { NotificationContext } from "../contexts/NotificationContext";
import { useContext } from "react";
const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const { addNotification, removeNotification } =
    useContext(NotificationContext);

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote, anecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
      addNotification(anecdote.content + " has been added");
      setTimeout(removeNotification, 5000);
    },
    onError: (error) => {
      addNotification(error.response.data.error);
      setTimeout(removeNotification, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
