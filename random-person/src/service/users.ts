const API_URL = 'https://randomuser.me/api'

const getUsersService = async () => {
    const res = await fetch(API_URL)
    if(!res.ok) throw Error('Error fetching data')
    const data = await res.json()
    return data.results
}

export { getUsersService }
