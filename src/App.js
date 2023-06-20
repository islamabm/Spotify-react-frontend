import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import './assets/scss/global.scss'
import { AppHeader } from './cmps/AppHeader'
import { RobotIndex } from './views/RobotIndex'
import { RobotDetails } from './views/RobotDetails'
import { RobotEdit } from './views/RobotEdit'

function App() {
  return (
    <Router>
      <section className="main-app">
        <AppHeader />

        <main className="container">
          <Routes>
            <Route path="/" element={<RobotIndex />} />
            <Route path="/robot/edit/:id?" element={<RobotEdit />} />
            <Route path="/robot/:id" element={<RobotDetails />} />
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
