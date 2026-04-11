import { useGithub } from '../context/github/GithubContext'
import { useTheme } from '../context/theme/ThemeContext'
import TypewriterHero from '../conponents/TypewriterHero'
import SearchBar from '../conponents/SearchBar'
import UserCard from '../conponents/UserCard'
import { UserCardSkeleton } from '../conponents/Skeletons'
import { FiAlertCircle, FiSearch, FiTrendingUp } from 'react-icons/fi'

const Home = () => {
    const { users, isLoading, error, recentSearches, bookmarks } = useGithub()
    const { isDark } = useTheme()
    const mutedColor = isDark ? 'text-white/40' : 'text-gray-400'
    const textColor = isDark ? 'text-white' : 'text-gray-900'

    return (
        <main className={`min-h-screen pt-24 pb-16 px-4 relative ${isDark ? 'bg-[#0a0a0f]' : 'bg-gray-50'}`}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-violet-500/5 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl" />
            </div>
            <div className="max-w-6xl mx-auto relative">
                <TypewriterHero />
                <div className="mb-8"><SearchBar /></div>

                {!users.length && !isLoading && !error && (
                    <div className="flex flex-col items-center gap-8 mt-8">
                        <div className="flex items-center gap-6 flex-wrap justify-center">
                            {[['Developers', '100M+'], ['Repositories', '300M+'], ['Bookmarks', bookmarks.length]].map(([label, value]) => (
                                <div key={label} className={`px-4 py-2 rounded-xl border text-center ${isDark ? 'bg-white/[0.03] border-white/8' : 'bg-white border-black/8'}`}>
                                    <div className={`text-lg font-bold ${textColor}`}>{value}</div>
                                    <div className={`text-xs ${mutedColor}`}>{label}</div>
                                </div>
                            ))}
                        </div>
                        {recentSearches.length > 0 && (
                            <div className="w-full max-w-2xl">
                                <div className={`flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider ${mutedColor}`}>
                                    <FiTrendingUp className="w-3.5 h-3.5" /> Recent Searches
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {recentSearches.map(q => (
                                        <span key={q} className={`px-3 py-1.5 rounded-lg text-xs border ${isDark ? 'bg-white/5 border-white/10 text-white/60' : 'bg-white border-black/10 text-gray-600'}`}>{q}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="text-center mt-4">
                            <FiSearch className={`w-12 h-12 mx-auto mb-3 ${mutedColor} opacity-30`} />
                            <p className={`text-sm ${mutedColor}`}>Search for GitHub users to get started</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="flex items-center gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm max-w-xl mx-auto mt-8">
                        <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                        {error} — GitHub API rate limit may be reached.
                    </div>
                )}

                {(isLoading || users.length > 0) && (
                    <div>
                        {users.length > 0 && (
                            <p className={`text-sm mb-4 ${mutedColor}`}>Found <span className={`font-semibold ${textColor}`}>{users.length}</span> users</p>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {isLoading ? [...Array(8)].map((_, i) => <UserCardSkeleton key={i} />) : users.map(user => <UserCard key={user.id} user={user} />)}
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default Home