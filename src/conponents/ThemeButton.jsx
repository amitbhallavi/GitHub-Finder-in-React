import React, { useContext, useState } from 'react'
import { FaPalette } from 'react-icons/fa'
import ThemeContext from '../context/theme/ThemeContext'
import { themeValue } from '../context/ThemReducer'

const ThemeButton = () => {
   
   const {dispatch} = useContext(ThemeContext)
   const [themeShow, setThemeShow] = useState(false)

   const handlethemeShow = ( themeType) => {
   
    if ( themeType === "MODERN_THEME") {
        localStorage.setItem('theme', JSON.stringify(themeValue.modernTheme))
    }else if ( themeType === "CLASSIC_THEME") {
        localStorage.setItem('theme', JSON.stringify(themeValue.classicTheme))
    }else {
        localStorage.setItem('theme', JSON.stringify(themeValue.neonTheme))
    }
   
   
   
   
    dispatch({
        type : themeType


    })
    setThemeShow(false)

   }
   
    return (
        <div className=' fixed bottom-4 left-10  '>
            

            <ul className={ themeShow ? ' my-4 space-y-2' : ' my-4 space-y-2 hidden'} > 
                <li onClick={() => handlethemeShow("MODERN_THEME")} className=' bg-gray-600 p-2 rounded-md text-center hover:bg-gray-400 cursor-pointer'> Modern Theme </li>
                <li onClick={() => handlethemeShow("CLASSIC_THEME")} className=' bg-gray-600 p-2 rounded-md text-center hover:bg-gray-400 cursor-pointer'> Classic Theme </li>
                <li onClick={() => handlethemeShow("NEON_THEME")} className=' bg-gray-600 p-2 rounded-md text-center hover:bg-gray-400 cursor-pointer'> Neon Theme </li>

            </ul>



            <button onMouseOver={() => setThemeShow(true)} className=" bg-blue-500 text-white flex items-center justify-center hover:scale-150 duration-350 transition-transform duration-200 rounded-full h-10 w-10  cursor-pointer">
                <FaPalette />
            </button>

        </div>
    )
}

export default ThemeButton
