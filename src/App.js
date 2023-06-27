import { useState } from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import './assets/scss/global.scss';
import { AppHeader } from './cmps/AppHeader';
import { AppNav } from './cmps/AppNav';
import { UserLibrary } from './cmps/UserLibrary';
import { AppFooter } from './cmps/AppFooter';
import { StationIndex } from './views/StationIndex';
import { StationDetails } from './views/StationDetails';
import { StationEdit } from './views/StationEdit';
import { Login } from './views/Login';
// import { Signup } from './views/Signup';
import Search from './views/Search';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Perform login logic here
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Perform logout logic here
    setIsLoggedIn(false);
  };


  return (
    <Router>
      <Routes>
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/" element={<LoggedInApp />} />
        <Route path="/login" element={<Login login={login} />} />
      </Routes>
    </Router>
  );
}

function LoggedInApp() {
  return (
    <section className="main-app">
      <AppHeader />
      <AppNav />
      <UserLibrary />
      <main className="container">
        <Routes>
          <Route path="/" element={<StationIndex />} />
          <Route path="/station/edit/:id?" element={<StationEdit />} />
          <Route path="/station/:id" element={<StationDetails />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      <AppFooter />
    </section>
  );
}

export default App;
