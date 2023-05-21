import { useQuery, useMutation, useQueryClient } from "react-query";
import { NotificationContext } from "./contexts/NotificationContext";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "./components/requests";
import { useContext } from "react";
const App = () => {
  const queryClient = useQueryClient();
  const { addNotification, removeNotification } =
    useContext(NotificationContext);
  const handleVote = (anecdote) => {
    console.log("vote");
    addNotification("You voted " + anecdote.content);
    setTimeout(removeNotification, 5000);
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });
  const result = useQuery("anecdotes", getAnecdotes, { retry: false });

  console.log(result);

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else if (result.isError) {
    return <span>Anecdote service is offline</span>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
