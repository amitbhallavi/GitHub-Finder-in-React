import { useGithub } from '../context/github/GithubContext'
import { useTheme } from '../context/theme/ThemeContext'
import UserCard from '../conponents/UserCard'
import { FiBookmark } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Bookmarks = () => {
    const { bookmarks } = useGithub()
    const { isDark } = useTheme()
    const bg = isDark ? 'bg-[#0a0a0f]' : 'bg-gray-50'
    const textColor = isDark ? 'text-white' : 'text-gray-900'
    const mutedColor = isDark ? 'text-white/40' : 'text-gray-400'

    return (
        <main className={`min-h-screen pt-24 pb-16 px-4 ${bg}`}>
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
                        <FiBookmark className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                        <h1 className={`text-xl font-bold ${textColor}`}>Bookmarks</h1>
                        <p className={`text-xs ${mutedColor}`}>{bookmarks.length} saved developer{bookmarks.length !== 1 ? 's' : ''}</p>
                    </div>
                </div>
                {bookmarks.length === 0 ? (
                    <div className="text-center py-20">
                        <FiBookmark className={`w-12 h-12 mx-auto mb-4 ${mutedColor} opacity-30`} />
                        <h2 className={`text-lg font-semibold mb-2 ${textColor}`}>No bookmarks yet</h2>
                        <p className={`text-sm mb-6 ${mutedColor}`}>Save developers you find interesting.</p>
                        <Link to="/" className="text-sm text-violet-400 hover:underline">Start searching →</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {bookmarks.map(user => <UserCard key={user.id} user={user} />)}
                    </div>
                )}
            </div>
        </main>
    )
}

export default Bookmarks