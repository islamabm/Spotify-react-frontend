import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import './assets/scss/global.scss'
import { AppHeader } from './cmps/AppHeader'
import { AppNav } from './cmps/AppNav'
import { UserLibrary } from './cmps/UserLibrary'
import { UserLibraryIndex } from './views/UserLibraryIndex'
import { UserMsg } from './cmps/UserMsg'
import { AppFooter } from './cmps/AppFooter'
import { StationIndex } from './views/StationIndex'
import { StationDetails } from './views/StationDetails'
import { Login } from './views/Login'
import { Signup } from './views/Signup'
import Search from './views/Search'
import SearchCategory from './views/SearchCategory'
import { getUser } from './store/actions/user.actions'
import { UserDetails } from './views/UserDetails'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { SongLyrics } from './views/SongLyrics'
import { OnlyLyrics } from './views/OnlyLyrics'
import { BottomNav } from '../src/cmps/Mobile/BottomNav'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const user = dispatch(getUser())
    console.log('user', user)
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<LoggedInApp />} />
      </Routes>
    </Router>
  )
}
function LoggedInApp() {
  return (
    <section className="main-app">
      <UserMsg />
      <AppHeader />
      <AppNav />
      <UserLibrary />
      <main className="container">
        <Routes>
          <Route path="/" element={<StationIndex />} />
          <Route path="/station/:id" element={<StationDetails />} />
          <Route path="/lyrics" element={<SongLyrics />} />
          <Route path="/only/lyrics" element={<OnlyLyrics />} />
          <Route path="/user" element={<UserDetails />} />
          <Route path="/library" element={<UserLibraryIndex />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/category" element={<SearchCategory />} />
          {/* Exclude /login and /signup */}
        </Routes>
      </main>
      <AppFooter />
      {/* <BottomNav/> */}
    </section>
  )
}

export default App
