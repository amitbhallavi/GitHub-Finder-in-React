import { useMemo, useRef, useEffect } from 'react'
import { useTheme } from '../context/theme/ThemeContext'

const LANG_COLORS = {
    JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572A5', Java: '#b07219',
    Go: '#00ADD8', Rust: '#dea584', Ruby: '#701516', CSS: '#563d7c', HTML: '#e34c26',
    Swift: '#ffac45', Kotlin: '#A97BFF', Shell: '#89e051', 'C++': '#f34b7d', 'C#': '#178600',
}
const getLangColor = (lang) => LANG_COLORS[lang] || '#8b949e'

const LanguageChart = ({ repos }) => {
    const { isDark } = useTheme()
    const canvasRef = useRef(null)

    const langData = useMemo(() => {
        const counts = {}
        repos.forEach(r => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1 })
        const total = Object.values(counts).reduce((a, b) => a + b, 0)
        return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 7)
            .map(([lang, count]) => ({ lang, count, pct: Math.round((count / total) * 100), color: getLangColor(lang) }))
    }, [repos])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !langData.length) return
        const ctx = canvas.getContext('2d')
        const size = canvas.width, cx = size / 2, cy = size / 2, r = size * 0.35
        ctx.clearRect(0, 0, size, size)
        let startAngle = -Math.PI / 2
        langData.forEach(({ pct, color }) => {
            const sweep = (pct / 100) * 2 * Math.PI
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, startAngle, startAngle + sweep)
            ctx.closePath(); ctx.fillStyle = color; ctx.fill()
            ctx.strokeStyle = isDark ? '#0a0a0f' : '#f8f8f8'; ctx.lineWidth = 2; ctx.stroke()
            startAngle += sweep
        })
        ctx.beginPath(); ctx.arc(cx, cy, r * 0.6, 0, 2 * Math.PI)
        ctx.fillStyle = isDark ? '#0d0d18' : '#ffffff'; ctx.fill()
    }, [langData, isDark])

    const cardBg = isDark ? 'bg-white/[0.03] border-white/8' : 'bg-white border-black/8'
    const textColor = isDark ? 'text-white' : 'text-gray-900'
    const mutedColor = isDark ? 'text-white/40' : 'text-gray-400'
    if (!langData.length) return null

    return (
        <div className={`rounded-2xl border p-5 ${cardBg}`}>
            <h3 className={`text-sm font-semibold mb-4 ${textColor}`}>Language Distribution</h3>
            <div className="flex items-center gap-6">
                <canvas ref={canvasRef} width={140} height={140} className="flex-shrink-0" />
                <div className="flex-1 space-y-2">
                    {langData.map(({ lang, pct, color }) => (
                        <div key={lang} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                                <span className={`text-xs truncate ${mutedColor}`}>{lang}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={`h-1 rounded-full w-[60px] ${isDark ? 'bg-white/10' : 'bg-black/5'}`}>
                                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                                </div>
                                <span className={`text-xs font-medium w-8 text-right ${textColor}`}>{pct}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LanguageChart