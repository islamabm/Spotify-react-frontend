import { getSpotifySvg } from "../services/SVG.service"
import { useLocation,Link } from "react-router-dom"
import { UserModal } from "./UserModal"
import { useState, useEffect } from "react"

export function AppHeader() {
  const [showModal, setShowModal] = useState(false)
  const location = useLocation()
  // const [headerOpacity, setHeaderOpacity] = useState(0)

  // useEffect(() => {
  //   window.addEventListener("scroll", updateHeaderOpacity())

  //   return () => {
  //     window.removeEventListener("scroll", updateHeaderOpacity())
  //   }
  // }, [])

  // function updateHeaderOpacity() {
  //   const scrollPosition =
  //     window.pageYOffset || document.documentElement.scrollTop
  //   const headerHeight = 64
  //   const opacityFactor = 3
  //   const header = Math.min(scrollPosition / (headerHeight * opacityFactor), 1)
  //   setHeaderOpacity(header)
  // }

  function onShowModal() {
    setShowModal(true)
  }

  function onCloseModal() {
    setShowModal(false)
  }
  // style={{ opacity: headerOpacity }}
  return (
    <header className="app-header">
      <section className="arrows-and-input">
        <section className="arrows">
          <div className="black-circle">
            <span
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg("leftArrowIcon"),
              }}
            ></span>
          </div>
          <div className="black-circle">
            <span
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg("rightArrowIcon"),
              }}
            ></span>
          </div>
        </section>
        {location.pathname === "/search" && (
          <div className="flex align-center justify-center">
            <input placeholder="What do you want to listen to?" />
          </div>
        )}
      </section>

      <div className="user-actions">
        <button className="sign-up pointer">Sign up</button>
        <Link to="/login">
        <button className="login pointer">Log in</button></Link>
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
