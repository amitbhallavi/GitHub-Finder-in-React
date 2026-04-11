import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import GithubContext from '../context/github/GithubContext'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";



const UserListItem = ({ user }) => {
 



  return (
    <div className=' my-2 gap-4 border border-gray-400 p-5 rounded-md shadow-lg flex  items-center justify-center bg-gray-900   '>
      <img className='h-50 rounded-full  ' src={user?.avatar_url} alt="" />
      <div>
        <p className='mb-2 text-sm text-gray-400'> #id : {user.id} </p>
        <h1 className=' text-lg text-white font-bold mb-2'> {user?.login} </h1>
        <p className='flex items-center gap-2 mb-4 text-sm font-bold text-white'> Public Repos : <FaEyeSlash/>{user.public_repos}</p>
        <p className='flex items-center gap-2 mb-4 text-sm font-bold text-white'> Followers :<FaEyeSlash/> {user.followers} </p>
        <p className='flex items-center gap-2 mb-4 text-sm font-bold text-white'> Bio :<FaEyeSlash/> {user.bio} </p>
        <p className='flex items-center gap-2 mb-4 text-sm font-bold text-white'> Location :<FaEyeSlash/> {user.location} </p>


        <Link to={`/user/${user.login}`} className=' w-full mb-5 text-lg text-white  font-bold bg-blue-500 p-2 rounded-md hover:bg-blue-700 cursor-pointer'> View Profile </Link>
      </div>
    </div>
  )
}

export default UserListItem
