import { useEffect, useMemo, useState, useRef } from 'react'

import { getUsers } from '../service/getUsers'
import { type User, SortBy } from '../types.d'

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const [sort, setSort] = useState(SortBy.NONE)
  const originalUsers = useRef<User[]>([])

  useEffect(
    () => {
      let isMounted = true
      getUsers()
        .then(usersData => {
          if (isMounted) {
            setUsers(usersData)
            originalUsers.current = usersData
          }
        })
      return () => {
        isMounted = false
      }
    },
    []
  )

  const filteredUsers = useMemo(() => {
    const newUsers = filterCountry
      ? users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
      : users;
    return newUsers
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    if (sort === SortBy.NONE) return filteredUsers;
    switch (sort) {
      case SortBy.COUNTRY:
        return [...filteredUsers].sort((a: User, b: User) => {
          return a.location.country.toLowerCase().localeCompare(b.location.country.toLowerCase())
        })
      case SortBy.NAME:
        return [...filteredUsers].sort((a: User, b: User) => {
          return a.name.first.toLowerCase().localeCompare(b.name.first.toLowerCase())
        })
      case SortBy.LAST:
        return [...filteredUsers].sort((a: User, b: User) => {
          return a.name.last.toLowerCase().localeCompare(b.name.last.toLowerCase())
        })
      default:
        return filteredUsers;
    }
  }, [filteredUsers, sort]);

  const handleSortByCountry = () => {
    const newSorting = sort === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSort(newSorting);
  }
  const handleDeleteRow = (userEmail: string) => {
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

  return { users: sortedUsers, handleSortByCountry, handleDeleteRow, handleRecoverData, handleChangeSort, handleFilterByCountry }
}

export { useUsers }
