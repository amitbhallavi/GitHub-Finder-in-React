import { useState, useEffect } from 'react'
import { useTheme } from '../context/theme/ThemeContext'

const PHRASES = ['Search Developers.', 'Analyze GitHub Profiles.', 'Discover Open Source Talent.', 'Explore Repositories.', 'Find Your Next Collaborator.']

const TypewriterHero = () => {
  const { isDark } = useTheme()
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const current = PHRASES[phraseIdx]
    let timeout
    if (!isDeleting && charIdx <= current.length) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx)); setCharIdx(p => p + 1) }, charIdx === current.length ? 1800 : 60)
      if (charIdx === current.length) timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && charIdx >= 0) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIdx)); setCharIdx(p => p - 1) }, 30)
      if (charIdx === 0) { setIsDeleting(false); setPhraseIdx(p => (p + 1) % PHRASES.length) }
    }
    return () => clearTimeout(timeout)
  }, [charIdx, isDeleting, phraseIdx])

  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        GitHub API Powered
      </div>
      <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">{displayed}</span>
        <span className="animate-pulse text-violet-400">|</span>
      </h1>
      <p className={`text-base sm:text-lg max-w-xl mx-auto ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
        A premium GitHub profile explorer. Search, analyze, and discover developers.
      </p>
    </div>
  )
}

export default TypewriterHero