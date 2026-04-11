import React, { use, useContext, useState } from 'react'
import { searchUsers } from '../context/github/GithubService';
import GithubContext from '../context/github/GithubContext';

const Form = () => {

    const { dispatch } = useContext(GithubContext)

    const [text, setText] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        dispatch({ type : "LOADING_SCREEN"})
        const data = await searchUsers(text)
        dispatch({
            type : "SEARCH_USERS",
            payload : data
        })
        setText("");
    }
 
    return (
    <form onSubmit={handleSearch} className=' w-[50%] border border-gray-400 shadow-lg p-10 rounded-md  text-center bg-gray-200 '>
        <h1 className='text-xl font-bold mb-5'> Search GitHub Users Here </h1>
        <input value={text} onChange={ (e) => setText(e.target.value)} type="text" placeholder='Search GitHub Users' required className='w-full outline-none text-black rounded-md p-2 border border-gray-500' />
       <button className='mt-2 p-2 w-full rounded-md bg-green-600 text-white text-xl font-bold hover:bg-green-700 cursor-pointer '> Search </button>
    </form>
  )
}

export default Form
