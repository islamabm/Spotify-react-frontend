import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import './assets/scss/global.scss'
import { AppHeader } from './cmps/AppHeader'
import { StationIndex } from './views/StationIndex'
import { StationDetails } from './views/StationDetails'
import { StationEdit } from './views/StationEdit'

function App() {
  return (
    <Router>
      <section className="main-app">
        <AppHeader />

        <main className="container">
          <Routes>
            <Route path="/" element={<StationIndex />} />
            <Route path="/station/edit/:id?" element={<StationEdit />} />
            <Route path="/station/:id" element={<StationDetails />} />
            {/* <Route path="/about" element={<About />} >
                            <Route path="/about/team" element={<Team />} />
                            <Route path="/about/vision" element={<Vision />} />
                        </Route> */}
          </Routes>
        </main>
      </section>
    </Router>
  )
}

export default App
