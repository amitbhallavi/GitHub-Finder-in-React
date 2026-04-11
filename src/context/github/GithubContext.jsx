import { createContext, useContext, useReducer, useCallback } from 'react'

const GithubContext = createContext()
const GITHUB_API = 'https://api.github.com'
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN
const fetchOpts = TOKEN ? { headers: { Authorization: `Bearer ${TOKEN}` } } : {}

const initialState = {
    users: [],
    user: null,
    repos: [],
    isLoading: false,
    isUserLoading: false,
    error: null,
    recentSearches: JSON.parse(localStorage.getItem('gh-recent') || '[]'),
    bookmarks: JSON.parse(localStorage.getItem('gh-bookmarks') || '[]'),
}

const githubReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING': return { ...state, isLoading: true, error: null }
        case 'SET_USER_LOADING': return { ...state, isUserLoading: true, error: null }
        case 'SET_USERS': return { ...state, users: action.payload, isLoading: false }
        case 'SET_USER': return { ...state, user: action.payload, isUserLoading: false }
        case 'SET_REPOS': return { ...state, repos: action.payload }
        case 'SET_ERROR': return { ...state, error: action.payload, isLoading: false, isUserLoading: false }
        case 'CLEAR_USERS': return { ...state, users: [] }
        case 'SET_RECENT': return { ...state, recentSearches: action.payload }
        case 'TOGGLE_BOOKMARK': {
            const exists = state.bookmarks.find(b => b.login === action.payload.login)
            const updated = exists
                ? state.bookmarks.filter(b => b.login !== action.payload.login)
                : [...state.bookmarks, action.payload]
            localStorage.setItem('gh-bookmarks', JSON.stringify(updated))
            return { ...state, bookmarks: updated }
        }
        default: return state
    }
}

export const GithubProvider = ({ children }) => {
    const [state, dispatch] = useReducer(githubReducer, initialState)

    const searchUsers = useCallback(async (query) => {
        if (!query.trim()) return
        dispatch({ type: 'SET_LOADING' })
        try {
            const res = await fetch(`${GITHUB_API}/search/users?q=${query}&per_page=12`, fetchOpts)
            if (!res.ok) throw new Error(`API Error: ${res.status}`)
            const data = await res.json()
            const basicUsers = data.items || []

            // ✅ Har user ki detailed info fetch karo parallel mein
            const detailedUsers = await Promise.all(
                basicUsers.map(async (user) => {
                    try {
                        const detailRes = await fetch(`${GITHUB_API}/users/${user.login}`, fetchOpts)
                        if (!detailRes.ok) return user
                        return await detailRes.json()
                    } catch {
                        return user
                    }
                })
            )

            dispatch({ type: 'SET_USERS', payload: detailedUsers })

            const recent = JSON.parse(localStorage.getItem('gh-recent') || '[]')
            const updated = [query, ...recent.filter(r => r !== query)].slice(0, 5)
            localStorage.setItem('gh-recent', JSON.stringify(updated))
            dispatch({ type: 'SET_RECENT', payload: updated })
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message })
        }
    }, [])

    const fetchUser = useCallback(async (username) => {
        dispatch({ type: 'SET_USER_LOADING' })
        try {
            const [userRes, reposRes] = await Promise.all([
                fetch(`${GITHUB_API}/users/${username}`, fetchOpts),
                fetch(`${GITHUB_API}/users/${username}/repos?per_page=30&sort=updated`, fetchOpts)
            ])
            if (!userRes.ok) throw new Error('User not found')
            const userData = await userRes.json()
            const reposData = await reposRes.json()
            dispatch({ type: 'SET_USER', payload: userData })
            dispatch({ type: 'SET_REPOS', payload: reposData })
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message })
        }
    }, [])

    const toggleBookmark = (user) => dispatch({ type: 'TOGGLE_BOOKMARK', payload: user })

    return (
        <GithubContext.Provider value={{ ...state, searchUsers, fetchUser, toggleBookmark, dispatch }}>
            {children}
        </GithubContext.Provider>
    )
}

export const useGithub = () => useContext(GithubContext)
export default GithubContext