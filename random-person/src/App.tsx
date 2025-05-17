import { useState, useEffect } from 'react'

import UserInfo from './components/UserInfo'
import { getUsersService } from './service/users'
import './App.css'

import type { User } from './types.d.ts'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getUsersService()
      .then(usersData => {
        setUsers(usersData)
      })
      .catch((error) => {
        console.error(error)
      })
    }
    return () => {
      isMounted = false
    }
  }, [])

  const handleGetPreviousPage = () => {
    setCurrentPage(currentPage => currentPage - 1)
  }
  const handleGetNextPage = () => {
    setCurrentPage(currentPage => currentPage + 1)
    if (currentPage + 1 === users.length) {
      getUsersService()
      .then(usersData  => {
        const newUsers = structuredClone(users)
        newUsers.push(usersData[0])
        setUsers(newUsers)
      })
    }
  }

  return (
    <>
      <header>
        <h1>Random Person Test</h1>
        <nav>
          <button onClick={handleGetPreviousPage} disabled={currentPage===0}>Previous Page</button>
          <button onClick={handleGetNextPage}>Next Page</button>
        </nav>
      </header>
      <main>
        <section className='current-page'>
          <span>{`Current page: ${currentPage}`}</span>
        </section>
        <section className='user-info'>
          {users.length && users[currentPage] && <UserInfo user={users[currentPage]} />}
        </section>
      </main>
    </>
  )
}

export default App
