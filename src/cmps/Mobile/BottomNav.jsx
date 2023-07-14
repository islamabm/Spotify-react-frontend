import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getSpotifySvg } from '../../services/SVG.service'

export function BottomNav() {

  const location = useLocation()
  const navigate = useNavigate()

 function getSvgIcon(iconName){
    if (iconName === 'homeIcon' && location.pathname === '/') {
      return getSpotifySvg('homeIconActive')
    }
    if (iconName === 'searchIcon' && location.pathname === '/search') {
      return getSpotifySvg('searchIconActive')
    }
    if (iconName === 'libraryIcon' && location.pathname === '/library') {
      return getSpotifySvg('libraryIconActive')
    }
    return getSpotifySvg(iconName)
  }

  function isActive(path){
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
              className={`library-icon shared-nav-item ${isActive('/library')}`}
            >
              <span
                className={`icon ${isActive('/library')}`}
                dangerouslySetInnerHTML={{
                  __html: getSvgIcon('libraryIcon'),
                }}
              ></span>
              <span className='library-icon-text'>Your Library</span>
            </Link>
          </section>
        )}
    </>
  )
}
