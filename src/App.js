import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import './assets/scss/global.scss'
import { AppHeader } from './cmps/AppHeader'
import { AppNav } from './cmps/AppNav'
import { UserLibrary } from './cmps/UserLibrary'
import { UserMsg } from './cmps/UserMsg'
import { AppFooter } from './cmps/AppFooter'
import { StationIndex } from './views/StationIndex'
import { StationDetails } from './views/StationDetails'
import { Login } from './views/Login'
import { Signup } from './views/Signup'
import Search from './views/Search'

import { UserDetails } from './views/UserDetails'

function App() {
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
          <Route path="/user" element={<UserDetails />} />
          <Route path="/search" element={<Search />} />
          {/* Exclude /login and /signup */}
        </Routes>
      </main>
      <AppFooter />
    </section>
  )
}

export default App
