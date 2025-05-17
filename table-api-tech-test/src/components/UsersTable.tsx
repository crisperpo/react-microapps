import { type User, SortBy } from '../types.d'

interface Props {
  users: User[],
  isColored: boolean,
  deleteRow: (emailUser: string) => void,
  changeSorting: (sort: SortBy) => void
}

const UsersTable = ({ users, isColored, deleteRow, changeSorting }: Props) => {
  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>Photo</th>
          <th onClick={() => changeSorting(SortBy.NAME)}>Name</th>
          <th onClick={() => changeSorting(SortBy.LAST)}>Surname</th>
          <th onClick={() => changeSorting(SortBy.COUNTRY)}>Country</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: User, index) => {
          const backgroundColor = (index % 2 === 0) ? '#CCC' : '#EEE';
          return (
            <tr key={user.email} style={{ backgroundColor: isColored ? backgroundColor : 'transparent' }}>
              <td>
                <img src={user.picture.thumbnail} alt={`Photo of the user ${user.name}`} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>{user.dob.age}</td>
              <td>
                <button onClick={() => deleteRow(user.email)}>X</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export { UsersTable };