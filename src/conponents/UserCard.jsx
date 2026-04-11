import { Link } from 'react-router-dom'
import { useGithub } from '../context/github/GithubContext'
import { useTheme } from '../context/theme/ThemeContext'
import { FiBookmark, FiExternalLink, FiUsers, FiBook } from 'react-icons/fi'

const UserCard = ({ user }) => {
    const { toggleBookmark, bookmarks } = useGithub()
    const { isDark } = useTheme()
    const isBookmarked = bookmarks.some(b => b.login === user.login)
    const cardBg = isDark ? 'bg-white/[0.03] border-white/8 hover:border-white/15 hover:bg-white/[0.06]' : 'bg-white border-black/8 hover:border-black/15 hover:shadow-lg'

    return (
        <div className={`group relative rounded-2xl border p-5 transition-all duration-300 ${cardBg}`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img src={user.avatar_url} alt={user.login} className="w-11 h-11 rounded-xl object-cover ring-2 ring-violet-500/20 group-hover:ring-violet-500/40 transition-all duration-300" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0a0a0f]" />
                    </div>
                    <div>
                        <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.login}</h3>
                        <p className={`text-xs mt-0.5 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>#{user.id}</p>
                    </div>
                </div>
                <button onClick={(e) => { e.preventDefault(); toggleBookmark(user) }}
                    className={`p-1.5 rounded-lg transition-all duration-200 ${isBookmarked ? 'text-violet-400 bg-violet-500/15' : `${isDark ? 'text-white/30 hover:text-white/60' : 'text-gray-300 hover:text-gray-600'}`}`}>
                    <FiBookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-violet-400' : ''}`} />
                </button>
            </div>
            <div className={`flex items-center gap-4 mb-4 text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                <span className="flex items-center gap-1"><FiUsers className="w-3 h-3" />{(user.followers || 0).toLocaleString()}</span>
                <span className="flex items-center gap-1"><FiBook className="w-3 h-3" />{user.public_repos || 0} repos</span>
            </div>
            <div className="flex items-center gap-2">
                <Link to={`/user/${user.login}`} className="flex-1 text-center text-xs font-semibold py-2 px-3 rounded-lg bg-violet-500/15 text-violet-400 hover:bg-violet-500/25 border border-violet-500/20 transition-all duration-200">
                    View Profile
                </Link>
                <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer"
                    className={`p-2 rounded-lg border transition-all duration-200 ${isDark ? 'border-white/10 text-white/40 hover:text-white hover:border-white/20' : 'border-black/10 text-gray-400 hover:text-gray-700'}`}>
                    <FiExternalLink className="w-3.5 h-3.5" />
                </a>
            </div>
        </div>
    )
}

export default UserCard