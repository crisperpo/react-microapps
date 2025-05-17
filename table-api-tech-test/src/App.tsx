import './App.css'
import { useState } from 'react'

import { UsersTable } from './components/UsersTable'
import { useUsers } from './hooks/useUsers'

function App() {
  const { handleSortByCountry, handleDeleteRow, handleRecoverData, handleChangeSort, handleFilterByCountry, users } = useUsers()
  const [isColored, setIsColored] = useState(false)

  return (
    <>
      <header>
        <h1>Technical Test</h1>
        <section style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={() => setIsColored(isColored => !isColored)}>Color rows</button>
          <button onClick={handleSortByCountry}>Sort by Country</button>
          <button onClick={handleRecoverData}>Restore data</button>
          <input placeholder='Filter by country' onChange={handleFilterByCountry} />
        </section>
      </header>
      <main>
        <UsersTable isColored={isColored} users={users} deleteRow={handleDeleteRow} changeSorting={handleChangeSort} />
      </main>
    </>
  )
}

export default App
