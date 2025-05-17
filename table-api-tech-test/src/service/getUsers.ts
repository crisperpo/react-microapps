import { type User } from '../types.d'

const API_URL = 'https://randomuser.me/api/?results=50'

const getUsers = async (): Promise<User[]> => {
    const res = await fetch(API_URL)
    if(!res.ok) throw Error('Error fetching')
    const data = await res.json()
    return data.results
}

export { getUsers }
