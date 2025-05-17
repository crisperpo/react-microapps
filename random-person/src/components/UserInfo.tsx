import type { User } from '../types.d.ts'

interface UserInfoProps {
    user: User
}

const UserInfo = ({ user }: UserInfoProps) => {
    const { title, first, last } = user.name
    return (
        <section className='user-profile'>
            <img src={user.picture.thumbnail} alt={`Picture of ${first} ${last}`} />
            <span>{`${title} ${first} ${last}`}</span>
        </section>
    )
}

export default UserInfo
