import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/theme/ThemeContext'
import { useGithub } from '../context/github/GithubContext'
import { FiBookmark, FiSun, FiMoon, FiHome } from 'react-icons/fi'
import GitLogo from '../assets/GitLogo.jpg'

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme()
  const { bookmarks } = useGithub()
  const location = useLocation()

  const navBg = isDark ? 'bg-[#0a0a0f]/80 border-white/5' : 'bg-white/80 border-black/10'
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const mutedColor = isDark ? 'text-white/50' : 'text-gray-500'
  const btnBg = isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-black/5 hover:bg-black/10 border-black/10'
  const isActive = (path) => location.pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b   ${navBg}`}>
      <div className="  text-xs px-1.5 py-0.5 rounded-md bg-violet-500/15 text-violet-400 font-medium border border-violet-500/20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={GitLogo}
              alt="GitHub Logo"
              className="w-15 bg-transparent  rounded-full object-cover group-hover:scale-105 transition-transform duration-200"
            />

          </Link>

          <div className=''>
            <span className={`font-semibold text-base tracking-tight ${textColor}`}>

            </span>
            <span className="text-lg font-bold  px-1.5 py-0.5 rounded-md  text-violet-400 font-medium ">
              GithubFinderPro
            </span>

          </div>


          {/* Nav Links */}
          <div className="flex items-center gap-1.5">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ${isActive('/')
                ? 'bg-violet-500/15 text-violet-400 border-violet-500/30'
                : `${btnBg} ${mutedColor}`
                }`}
            >
              <FiHome className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Home</span>
            </Link>

            <Link
              to="/bookmarks"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ${isActive('/bookmarks')
                ? 'bg-violet-500/15 text-violet-400 border-violet-500/30'
                : `${btnBg} ${mutedColor}`
                }`}
            >
              <FiBookmark className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Saved</span>
              {bookmarks.length > 0 && (
                <span className="w-4 h-4 text-[10px] font-bold rounded-full bg-violet-500 text-white flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            <button
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-lg border ${btnBg} flex items-center justify-center ${mutedColor}`}
            >
              {isDark ? <FiSun className="w-3.5 h-3.5" /> : <FiMoon className="w-3.5 h-3.5" />}
            </button>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar