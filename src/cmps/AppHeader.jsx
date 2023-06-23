import { getSpotifySvg } from '../services/SVG.service'
import { useLocation } from 'react-router-dom'
import { UserModal } from './UserModal'
import { useState, useEffect } from 'react'

export function AppHeader() {
  const [showModal, setShowModal] = useState(false)
  const location = useLocation()
  const opacity = {opacity: 1}
  const [isScrolled, setIsScrolled] = useState(false)

  function onShowModal() {
    setShowModal(true)
  }

  function onCloseModal() {
    setShowModal(false)
  }

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
      <section className="arrows-and-input">
        <section className="arrows">
          <div className="black-circle">
            <span
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('leftArrowIcon'),
              }}
            ></span>
          </div>
          <div className="black-circle">
            <span
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('rightArrowIcon'),
              }}
            ></span>
          </div>
        </section>
        {location.pathname === '/search' && (
          <div className="flex align-center justify-center">
            <input placeholder="What do you want to listen to?" />
          </div>
        )}
      </section>

      <div className="user-actions">
        <button className="sign-up pointer">Sign up</button>
        <button className="login pointer">Login</button>
        <img
          onClick={onShowModal}
          src="https://i.scdn.co/image/ab6761610000e5eb601fb0059594d52f3f7939a9"
          className="pointer"
        />
      </div>
      {showModal && <UserModal onClose={onCloseModal} />}
    </header>
  )
}
