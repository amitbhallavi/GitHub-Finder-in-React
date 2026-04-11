import { useState, useMemo } from 'react'
import { useTheme } from '../context/theme/ThemeContext'
import { FiStar, FiGitBranch, FiSearch, FiExternalLink } from 'react-icons/fi'

const LANG_COLORS = { JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5', Go: '#00ADD8', Rust: '#dea584', Ruby: '#701516', CSS: '#563d7c', HTML: '#e34c26' }
const getLangColor = (lang) => LANG_COLORS[lang] || '#8b949e'
const timeAgo = (d) => { const days = Math.floor((Date.now() - new Date(d)) / 86400000); return days === 0 ? 'today' : days < 30 ? `${days}d ago` : days < 365 ? `${Math.floor(days / 30)}mo ago` : `${Math.floor(days / 365)}y ago` }

const ReposSection = ({ repos }) => {
    const { isDark } = useTheme()
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('updated')

    const filtered = useMemo(() => {
        let list = repos.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || (r.description || '').toLowerCase().includes(search.toLowerCase()))
        if (sort === 'stars') list = [...list].sort((a, b) => b.stargazers_count - a.stargazers_count)
        else if (sort === 'forks') list = [...list].sort((a, b) => b.forks_count - a.forks_count)
        else list = [...list].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        return list
    }, [repos, search, sort])

    const cardBg = isDark ? 'bg-white/[0.03] border-white/8' : 'bg-white border-black/8'
    const textColor = isDark ? 'text-white' : 'text-gray-900'
    const mutedColor = isDark ? 'text-white/40' : 'text-gray-400'
    const inputBg = isDark ? 'bg-white/5 border-white/10 text-white placeholder-white/30' : 'bg-black/5 border-black/10 text-gray-900'
    const btnActive = 'border-violet-500/50 text-violet-400 bg-violet-500/10'
    const btnBase = isDark ? 'border-white/10 text-white/50 hover:text-violet-400' : 'border-black/10 text-gray-500 hover:text-violet-600'

    return (
        <div className={`rounded-2xl border p-5 ${cardBg}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <h3 className={`text-sm font-semibold ${textColor}`}>
                    Repositories <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-white/10 text-white/50' : 'bg-black/5 text-gray-500'}`}>{repos.length}</span>
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs ${inputBg}`}>
                        <FiSearch className="w-3 h-3" />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter..." className="bg-transparent outline-none w-24" />
                    </div>
                    {['updated', 'stars', 'forks'].map(s => (
                        <button key={s} onClick={() => setSort(s)} className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${sort === s ? btnActive : btnBase}`}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 custom-scroll">
                {filtered.length === 0 ? <div className={`text-center py-10 text-sm ${mutedColor}`}>No repos found</div> : filtered.map(repo => (
                    <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                        className={`block p-4 rounded-xl border transition-all group ${isDark ? 'border-white/5 hover:border-white/15 hover:bg-white/[0.03]' : 'border-black/5 hover:border-black/15 hover:bg-gray-50'}`}>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                            <span className={`text-sm font-medium truncate group-hover:text-violet-400 transition-colors ${textColor}`}>{repo.name}</span>
                            <FiExternalLink className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 ${mutedColor}`} />
                        </div>
                        {repo.description && <p className={`text-xs mb-2 line-clamp-1 ${mutedColor}`}>{repo.description}</p>}
                        <div className={`flex items-center gap-4 text-[11px] ${mutedColor}`}>
                            {repo.language && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: getLangColor(repo.language) }} />{repo.language}</span>}
                            <span className="flex items-center gap-1"><FiStar className="w-3 h-3" />{repo.stargazers_count}</span>
                            <span className="flex items-center gap-1"><FiGitBranch className="w-3 h-3" />{repo.forks_count}</span>
                            <span className="ml-auto">{timeAgo(repo.updated_at)}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default ReposSection