import { useTheme } from '../context/theme/ThemeContext'

export const UserCardSkeleton = () => {
    const { isDark } = useTheme()
    const pulse = isDark ? 'bg-white/10' : 'bg-black/10'
    const bg = isDark ? 'bg-white/5 border-white/8' : 'bg-black/5 border-black/8'
    return (
        <div className={`rounded-2xl border p-5 ${bg}`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl ${pulse} animate-pulse`} />
                    <div>
                        <div className={`h-3 w-24 rounded-full ${pulse} animate-pulse mb-1.5`} />
                        <div className={`h-2.5 w-16 rounded-full ${pulse} animate-pulse`} />
                    </div>
                </div>
                <div className={`w-7 h-7 rounded-lg ${pulse} animate-pulse`} />
            </div>
            <div className="flex gap-4 mb-4">
                <div className={`h-2.5 w-16 rounded-full ${pulse} animate-pulse`} />
                <div className={`h-2.5 w-20 rounded-full ${pulse} animate-pulse`} />
            </div>
            <div className={`h-8 rounded-lg ${pulse} animate-pulse`} />
        </div>
    )
}

export const UserDetailSkeleton = () => {
    const { isDark } = useTheme()
    const pulse = isDark ? 'bg-white/10' : 'bg-black/10'
    return (
        <div className="max-w-5xl mx-auto px-4 py-8 animate-pulse">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-72 flex-shrink-0">
                    <div className={`w-full aspect-square rounded-2xl ${pulse} mb-4`} />
                    <div className={`h-4 w-3/4 rounded-full ${pulse} mb-2`} />
                    <div className={`h-3 w-1/2 rounded-full ${pulse} mb-4`} />
                </div>
                <div className="flex-1 space-y-4">
                    {[...Array(5)].map((_, i) => <div key={i} className={`h-24 rounded-2xl ${pulse}`} />)}
                </div>
            </div>
        </div>
    )
}