import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getSpotifySvg } from '../../services/SVG.service'

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const getSvgIcon = (iconName) => {
    if (iconName === 'homeIcon' && location.pathname === '/') {
      return getSpotifySvg('homeIconActive')
    }
    if (iconName === 'searchIcon' && location.pathname === '/search') {
      return getSpotifySvg('searchIconActive')
    }
    return getSpotifySvg(iconName)
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  function goHome() {
    navigate('/')
  }

  return (
    <>
      {window.innerWidth < 460 &&
        location.pathname !== '/mobileMediaPlayer' && (
          <section className="bottom-nav-container">
            <Link to="/" className={`shared-nav-item ${isActive('/')}`}>
              <span
                className={`icon ${isActive('/')}`}
                dangerouslySetInnerHTML={{ __html: getSvgIcon('homeIcon') }}
              ></span>
              <span onClick={goHome}>Home</span>
            </Link>
            <Link
              to="/search"
              className={`shared-nav-item ${isActive('/search')}`}
            >
              <span
                className={`icon ${isActive('/search')}`}
                dangerouslySetInnerHTML={{ __html: getSvgIcon('searchIcon') }}
              ></span>
              <span>Search</span>
            </Link>
            <Link
            
              to="/library"
              className={`library-icon shared-nav-item ${isActive('/userLibrary')}`}
            >
              <span
                className={`icon ${isActive('/userLibrary')}`}
                dangerouslySetInnerHTML={{
                  __html: getSvgIcon('libraryIconActive'),
                }}
              ></span>
              <span className='library-icon-text'>Your Library</span>
            </Link>
          </section>
        )}
    </>
  )
}
