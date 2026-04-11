import React, { useContext } from 'react'
import ThemeContext from '../context/theme/ThemeContext'
import UserListItem from './UserListItem'
import GithubContext from '../context/github/GithubContext'

const UsersListGroup = () => {

   const themeContext = useContext(ThemeContext)
   const theme = themeContext?.theme ?? 'light'  // ✅ null safe

   const { users, isLoading } = useContext(GithubContext)

   if (isLoading) {
      return (
         <h1 className="text-white text-center text-3xl font-bold my-10">
            Searching Users....
         </h1>
      )
   }

   return (
      <div className={`my-6 min-w-[50%] ${theme} grid grid-cols-1 md:grid-cols-3 gap-4`}>
         {
            users.map((user) => <UserListItem key={user.id} user={user} />)
         }
      </div>
   )
}

export default UsersListGroup