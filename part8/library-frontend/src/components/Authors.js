import { useQuery } from '@apollo/client'
import { GET_ALL_AUTHORS } from './queries';

const Authors = (props) => {


  const queryName = GET_ALL_AUTHORS;
  const queryResult = useQuery(queryName);

  const isLoading = queryResult.loading;
  const hasError = queryResult.error;
  const queryData = queryResult.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Error: {hasError.message}</div>;
  }
  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {queryData.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
