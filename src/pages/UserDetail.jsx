import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGithub } from '../context/github/GithubContext'
import { useTheme } from '../context/theme/ThemeContext'
import { UserDetailSkeleton } from '../conponents/Skeletons'
import LanguageChart from '../conponents/LanguageChart'
import ReposSection from '../conponents/ReposSection'
import { FiArrowLeft, FiMapPin, FiLink, FiUsers, FiBook, FiStar, FiGitBranch, FiBookmark, FiExternalLink, FiCopy, FiCheck, FiCalendar, FiBriefcase, FiAlertCircle } from 'react-icons/fi'

const StatCard = ({ icon: Icon, label, value, isDark }) => (
    <div className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center ${isDark ? 'bg-white/[0.03] border-white/8' : 'bg-white border-black/8'}`}>
        <Icon className={`w-4 h-4 mb-2 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
        <div className={`text-xl font-bold mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{typeof value === 'number' ? value.toLocaleString() : value}</div>
        <div className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>{label}</div>
    </div>
)

const InfoRow = ({ icon: Icon, value, href, isDark }) => {
    if (!value) return null
    const mutedColor = isDark ? 'text-white/50' : 'text-gray-500'
    const textColor = isDark ? 'text-white/80' : 'text-gray-700'
    const content = (
        <div className={`flex items-center gap-2 text-sm ${href ? `hover:text-violet-400 transition-colors ${textColor}` : mutedColor}`}>
            <Icon className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{value}</span>
        </div>
    )
    return href ? <a href={href} target="_blank" rel="noopener noreferrer">{content}</a> : content
}

const UserDetail = () => {
    const { id } = useParams()
    const { fetchUser, user, repos, isUserLoading, error, toggleBookmark, bookmarks } = useGithub()
    const { isDark } = useTheme()
    const [copied, setCopied] = useState(false)

    useEffect(() => { fetchUser(id); window.scrollTo(0, 0) }, [id])

    const isBookmarked = bookmarks.some(b => b.login === user?.login)
    const totalStars = useMemo(() => repos.reduce((acc, r) => acc + r.stargazers_count, 0), [repos])
    const totalForks = useMemo(() => repos.reduce((acc, r) => acc + r.forks_count, 0), [repos])
    const topRepos = useMemo(() => [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3), [repos])

    const copyUsername = async () => { await navigator.clipboard.writeText(user.login); setCopied(true); setTimeout(() => setCopied(false), 2000) }

    const bg = isDark ? 'bg-[#0a0a0f]' : 'bg-gray-50'
    const cardBg = isDark ? 'bg-white/[0.03] border-white/8' : 'bg-white border-black/8'
    const textColor = isDark ? 'text-white' : 'text-gray-900'
    const mutedColor = isDark ? 'text-white/40' : 'text-gray-400'

    if (isUserLoading) return <div className={`min-h-screen pt-20 ${bg}`}><UserDetailSkeleton /></div>

    if (error || !user) return (
        <div className={`min-h-screen pt-24 flex flex-col items-center justify-center px-4 ${bg}`}>
            <FiAlertCircle className="w-12 h-12 text-red-400 mb-4" />
            <h2 className={`text-xl font-semibold mb-2 ${textColor}`}>User not found</h2>
            <Link to="/" className="text-sm text-violet-400 hover:underline flex items-center gap-1"><FiArrowLeft className="w-4 h-4" /> Back to search</Link>
        </div>
    )

    return (
        <div className={`min-h-screen pt-20 pb-16 ${bg}`}>
            <div className="max-w-6xl mx-auto px-4 py-6">
                <Link to="/" className={`inline-flex items-center gap-2 text-sm mb-6 hover:text-violet-400 transition-colors ${mutedColor}`}>
                    <FiArrowLeft className="w-4 h-4" /> Back to search
                </Link>
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-72 flex-shrink-0 space-y-4">
                        <div className={`rounded-2xl border p-5 ${cardBg}`}>
                            <div className="relative mb-4">
                                <img src={user.avatar_url} alt={user.login} className="w-full aspect-square rounded-2xl object-cover ring-4 ring-violet-500/10" />
                                {user.hireable && (
                                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Hireable
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <h1 className={`text-xl font-bold ${textColor}`}>{user.name || user.login}</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-sm ${mutedColor}`}>@{user.login}</span>
                                    <button onClick={copyUsername} className={`p-1 rounded-md ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'} ${mutedColor}`}>
                                        {copied ? <FiCheck className="w-3 h-3 text-green-400" /> : <FiCopy className="w-3 h-3" />}
                                    </button>
                                </div>
                            </div>
                            {user.bio && <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>{user.bio}</p>}
                            <div className="space-y-2 mb-5">
                                <InfoRow icon={FiMapPin} value={user.location} isDark={isDark} />
                                <InfoRow icon={FiBriefcase} value={user.company} isDark={isDark} />
                                <InfoRow icon={FiLink} value={user.blog} href={user.blog?.startsWith('http') ? user.blog : user.blog ? `https://${user.blog}` : null} isDark={isDark} />
                                <InfoRow icon={FiCalendar} value={user.created_at ? `Joined ${new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}` : null} isDark={isDark} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <a href={user.html_url} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold bg-violet-500 text-white hover:bg-violet-600 transition-all">
                                    <FiExternalLink className="w-3.5 h-3.5" /> View on GitHub
                                </a>
                                <button onClick={() => toggleBookmark(user)}
                                    className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold border transition-all ${isBookmarked ? 'bg-violet-500/15 text-violet-400 border-violet-500/30' : `${isDark ? 'border-white/10 text-white/60' : 'border-black/10 text-gray-600'}`}`}>
                                    <FiBookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-violet-400' : ''}`} />
                                    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                                </button>
                            </div>
                        </div>
                        {repos.length > 0 && <LanguageChart repos={repos} />}
                    </div>

                    <div className="flex-1 space-y-4 min-w-0">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <StatCard icon={FiUsers} label="Followers" value={user.followers} isDark={isDark} />
                            <StatCard icon={FiUsers} label="Following" value={user.following} isDark={isDark} />
                            <StatCard icon={FiBook} label="Repos" value={user.public_repos} isDark={isDark} />
                            <StatCard icon={FiStar} label="Stars Earned" value={totalStars} isDark={isDark} />
                        </div>
                        {topRepos.length > 0 && (
                            <div className={`rounded-2xl border p-5 ${cardBg}`}>
                                <h3 className={`text-sm font-semibold mb-4 ${textColor}`}>Top Repositories</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {topRepos.map((repo, i) => (
                                        <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                                            className={`p-4 rounded-xl border transition-all group ${isDark ? 'border-white/5 hover:border-violet-500/30' : 'border-black/5 hover:border-violet-500/30'}`}>
                                            <div className={`text-xs font-bold px-1.5 py-0.5 rounded mb-2 inline-block ${isDark ? 'bg-violet-500/15 text-violet-400' : 'bg-violet-100 text-violet-600'}`}>#{i + 1}</div>
                                            <div className={`text-sm font-semibold truncate mb-1 group-hover:text-violet-400 ${textColor}`}>{repo.name}</div>
                                            {repo.description && <p className={`text-xs line-clamp-2 mb-2 ${mutedColor}`}>{repo.description}</p>}
                                            <div className={`flex items-center gap-3 text-xs ${mutedColor}`}>
                                                <span className="flex items-center gap-1"><FiStar className="w-3 h-3" />{repo.stargazers_count}</span>
                                                <span className="flex items-center gap-1"><FiGitBranch className="w-3 h-3" />{repo.forks_count}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className={`rounded-2xl border p-5 ${cardBg}`}>
                            <h3 className={`text-sm font-semibold mb-4 ${textColor}`}>Developer Insights</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    ['Activity Level', user.public_repos > 50 ? '🔥 Very Active' : user.public_repos > 20 ? '⚡ Active' : '💤 Low Activity'],
                                    ['Total Stars', `${totalStars.toLocaleString()} ⭐`],
                                    ['Total Forks', `${totalForks.toLocaleString()} 🍴`],
                                ].map(([label, value]) => (
                                    <div key={label} className={`p-4 rounded-xl ${isDark ? 'bg-white/[0.03]' : 'bg-gray-50'}`}>
                                        <div className={`text-xs mb-1 ${mutedColor}`}>{label}</div>
                                        <div className={`text-sm font-semibold ${textColor}`}>{value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {repos.length > 0 && <ReposSection repos={repos} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetail