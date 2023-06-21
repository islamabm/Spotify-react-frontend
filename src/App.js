import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import './assets/scss/global.scss'
import { AppHeader } from './cmps/AppHeader'
import { AppNav } from './cmps/AppNav'
import { UserLibrary } from './cmps/UserLibrary'
import { AppFooter } from './cmps/AppFooter'
import { StationIndex } from './views/StationIndex'
import { StationDetails } from './views/StationDetails'
import { StationEdit } from './views/StationEdit'
import Search from './views/Search'

function App() {
  return (
    <Router>
      <section className="main-app">
        <AppHeader />
        <AppNav />
        <UserLibrary />

        <main className="container">
          <Routes>
            <Route path="/" element={<StationIndex />}>
              {' '}
            </Route>

            <Route path="/station/edit/:id?" element={<StationEdit />} />
            <Route path="/station/:id" element={<StationDetails />} />
            <Route path="/search" element={<Search />} />
            {/* <Route path="/about" element={<About />} >
                            <Route path="/about/team" element={<Team />} />
                            <Route path="/about/vision" element={<Vision />} />
                        </Route> */}
          </Routes>
        </main>
        <AppFooter />
      </section>
    </Router>
  )
}

export default App
