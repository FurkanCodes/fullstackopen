import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Notify from './components/Notify'
import { GET_ALL_BOOKS } from './components/queries'
import { useApolloClient, useQuery } from '@apollo/client'
import BooksByGenreView from './components/BooksByGenreView'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState("")
  const result = useQuery(GET_ALL_BOOKS)


  const client = useApolloClient()

  if (result.loading) {
    return <div>loading...</div>
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore();
  }

  if (!token) {
    return (
      <div>
        <Notify error={error} key={error} onClose={() => setError(null)} />
        <h2>Login</h2>
        <Login
          setToken={setToken}
          setError={setError}
          setPage={setPage}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommendations</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <BooksByGenreView show={page === "recommend"} />
    </div>
  )
}

export default App
