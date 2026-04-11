import { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/theme/ThemeContext'
import { GithubProvider } from './context/github/GithubContext'
import Home from './pages/Home'
import UserDetail from './pages/UserDetail'
import Bookmarks from './pages/Bookmarks'
import Navbar from './conponents/Navbar'
import ThemeContext from './context/theme/ThemeContext'

const AppContent = () => {
  const { isDark } = useContext(ThemeContext)
  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-[#0a0a0f] text-white transition-all duration-300" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </div>
    </div>
  )
}

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <GithubProvider>
        <AppContent />
      </GithubProvider>
    </ThemeProvider>
  </BrowserRouter>
)

export default App