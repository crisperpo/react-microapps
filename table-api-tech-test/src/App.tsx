import './App.css'
import { useEffect, useMemo, useState, useRef } from 'react'

// import users from './mocks/users.json'
import { UsersTable } from './components/UsersTable'
import { type User, SortBy } from './types.d'

const API_URL = 'https://randomuser.me/api/?results=10'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [isColored, setIsColored] = useState(false)
  const [sort, setSort] = useState(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])

  const handleColorRows = () => {
    setIsColored(isColored => !isColored)
  };
  const handleSortByCountry = () => {
    const newSorting = sort === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE 
    setSort(newSorting);
  }
  const handleDeleteRow= (userEmail: string) => {
    const filteredUsers = users.filter(user => user.email !== userEmail)
    setUsers(filteredUsers)
  }
  const handleRecoverData = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSort(sort)
  }

  const handleFilterByCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setFilterCountry(e.target.value)
  }

  const filteredUsers = useMemo(() => {
    const newUsers = filterCountry
      ? users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
      : users;
    return newUsers
  },[users, filterCountry]);

  const sortedUsers = useMemo(() => {
    if(sort === SortBy.NONE) return filteredUsers;
    switch(sort) {
      case SortBy.COUNTRY:
        return [...filteredUsers].sort((a:User, b:User) => {
          return a.location.country.toLowerCase().localeCompare(b.location.country.toLowerCase())
        })
        case SortBy.NAME:
          return [...filteredUsers].sort((a:User, b:User) => {
            return a.name.first.toLowerCase().localeCompare(b.name.first.toLowerCase())
          })
        case SortBy.LAST:
            return [...filteredUsers].sort((a:User, b:User) => {
              return a.name.last.toLowerCase().localeCompare(b.name.last.toLowerCase())
            })
      default:
        return filteredUsers;
    }
  },[filteredUsers,sort]);

  useEffect(
    () => {
      let isMounted = true;
      fetch(API_URL)
        .then(res => res.json())
        .then(res => {
          if (isMounted){
            setUsers(res.results)
            originalUsers.current = res.results
          }
        })
      return () => {
        isMounted = false
      }
    },
    []
  )
  return (
    <>
      <header>
        <h1>Technical Test</h1>
        <section style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
          <button onClick={handleColorRows}>Color rows</button>
          <button onClick={handleSortByCountry}>Sort by Country</button>
          <button onClick={handleRecoverData}>Restore data</button>
          <input placeholder='Filter by country' onChange={handleFilterByCountry} />
        </section>
      </header>
      <main>
        <UsersTable isColored={isColored} users={sortedUsers} deleteRow={handleDeleteRow} changeSorting={handleChangeSort} />
      </main>
    </>
  )
}

export default App
