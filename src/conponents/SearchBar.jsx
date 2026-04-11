import { useState, useEffect, useRef, useCallback } from 'react'
import { useGithub } from '../context/github/GithubContext'
import { useTheme } from '../context/theme/ThemeContext'
import { FiSearch, FiX, FiClock } from 'react-icons/fi'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(-1)
  const { searchUsers, recentSearches, isLoading, dispatch } = useGithub()
  const { isDark } = useTheme()
  const inputRef = useRef(null)
  const containerRef = useRef(null)
  const debounceRef = useRef(null)

  const bg = isDark ? 'bg-white/5 border-white/10 text-white placeholder-white/30' : 'bg-black/5 border-black/10 text-gray-900 placeholder-gray-400'
  const dropBg = isDark ? 'bg-[#14141f] border-white/10' : 'bg-white border-black/10'
  const hoverItem = isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
  const mutedText = isDark ? 'text-white/40' : 'text-gray-400'

  const handleSearch = useCallback((value) => {
    if (!value.trim()) return
    searchUsers(value)
    setShowSuggestions(false)
    inputRef.current?.blur()
  }, [searchUsers])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (query.length > 1) {
      debounceRef.current = setTimeout(() => searchUsers(query), 500)
    }
    return () => clearTimeout(debounceRef.current)
  }, [query])

  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setShowSuggestions(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(prev => Math.min(prev + 1, recentSearches.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx(prev => Math.max(prev - 1, -1)) }
    else if (e.key === 'Enter') {
      if (selectedIdx >= 0) { setQuery(recentSearches[selectedIdx]); handleSearch(recentSearches[selectedIdx]) }
      else handleSearch(query)
    } else if (e.key === 'Escape') setShowSuggestions(false)
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-all duration-300 ${bg} focus-within:border-violet-500/50 focus-within:shadow-lg focus-within:shadow-violet-500/10`}>
        <FiSearch className={`w-4 h-4 ${mutedText} flex-shrink-0 ${isLoading ? 'animate-spin' : ''}`} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setShowSuggestions(true); setSelectedIdx(-1) }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search GitHub users..."
          className="flex-1 bg-transparent outline-none text-sm font-medium"
        />
        {query && (
          <button onClick={() => { setQuery(''); dispatch({ type: 'CLEAR_USERS' }) }} className={`${mutedText} hover:text-violet-400`}>
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
      {showSuggestions && recentSearches.length > 0 && (
        <div className={`absolute top-full mt-2 left-0 right-0 rounded-xl border ${dropBg} overflow-hidden shadow-xl z-50`}>
          <div className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-wider ${mutedText} border-b border-white/5`}>Recent searches</div>
          {recentSearches.map((item, idx) => (
            <button key={item} onClick={() => { setQuery(item); handleSearch(item) }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-all ${hoverItem} ${idx === selectedIdx ? (isDark ? 'bg-white/5' : 'bg-gray-50') : ''}`}>
              <FiClock className={`w-3.5 h-3.5 ${mutedText}`} />
              <span className={isDark ? 'text-white/70' : 'text-gray-600'}>{item}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar