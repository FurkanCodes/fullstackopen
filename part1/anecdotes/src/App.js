import { useEffect, useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
const arr = new Uint8Array(8)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(arr)

  let biggest = votes.indexOf(Math.max(...votes));

const randomAnecdote = () => {
  let randomNumber = Math.floor(Math.random() * 7) + 1;
  setSelected(randomNumber)
}

const handleVote = () => {
  const copy = [...votes]
  copy[selected]++;
  setVotes(copy)
} 

  return (
  
    <div>
      <h3>Anecdote of the day</h3>
      {anecdotes[selected]}
      <p>Has {votes[selected]} votes</p>
      <button style={{display: 'block'}} onClick={randomAnecdote}>next anecdote</button>
      <button style={{display: 'block'}} onClick={handleVote}>vote</button>
      <h3>Anecdote with most votes</h3>
      {anecdotes[biggest]}
    {votes[biggest]}
    </div>
  )
}

export default App