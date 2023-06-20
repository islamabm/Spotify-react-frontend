import { Route, HashRouter as Router, Routes, Switch } from 'react-router-dom';
import './assets/scss/global.scss'
import { AppHeader } from './cmps/AppHeader'
import { RobotIndex } from './views/RobotIndex'
import { About } from './views/About';
import { RobotDetails } from './views/RobotDetails';
import { RobotEdit } from './views/RobotEdit';

const Team = () => {
    return (
        <ul>
            <li>Moshe Girit</li>
            <li>Dan Gonzales</li>
            <li>Shimon Dicaprio</li>
        </ul>
    )
}

const Vision = () => {
    return (
        <ol>
            <li>Save the world with our robots</li>
            <li>Take over the world with our robots</li>
        </ol>
    )
}

function App() {
    return (
        <Router>
            <section className="main-app">
                <AppHeader />

                <main className="container">
                    <Routes>
                        <Route path="/" element={<RobotIndex isDark={true} />} />
                        <Route path="/robot/edit/:id?" element={<RobotEdit />} />
                        <Route path="/robot/:id" element={<RobotDetails />} />
                        <Route path="/about" element={<About />} >
                            <Route path="/about/team" element={<Team />} />
                            <Route path="/about/vision" element={<Vision />} />
                        </Route>
                    </Routes>
                </main>

                <footer>
                    <section className="container">
                        robotRights 2022 &copy;
                    </section>
                </footer>

            </section>
        </Router>
    )
}

export default App;
