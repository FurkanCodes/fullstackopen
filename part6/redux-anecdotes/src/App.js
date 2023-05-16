import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import anecdoteService from "./services/anecdoteService";
import anecdoteSlice, { setAnecdotes } from "./reducers/anecdoteSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);
  return (
    <div>
      <AnecdoteList />
      <Filter />
      <AnecdoteForm />
    </div>
  );
};

export default App;
