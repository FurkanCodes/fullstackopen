import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import anecdoteService from "./services/anecdoteService";
import anecdoteSlice, {
  setAnecdotes,
  initAnecdotes,
} from "./reducers/anecdoteSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Notification from "./components/Notification";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initAnecdotes());
  }, [dispatch]);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />

      <Filter />
      <AnecdoteForm />
    </div>
  );
};

export default App;
