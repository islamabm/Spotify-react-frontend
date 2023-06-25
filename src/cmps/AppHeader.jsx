import { getSpotifySvg } from '../services/SVG.service'
import { useLocation, Link } from 'react-router-dom'
import { UserModal } from './UserModal'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { eventBus } from '../services/event-bus.service'
export function AppHeader() {
  const [showModal, setShowModal] = useState(false)
  const [currScrollPos, setScrollPos] = useState(0)

  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )

  const gradient = useSelector(
    (storeState) => storeState.stationModule.currStationGradientColor
  )
  console.log('gradient', gradient)
  const location = useLocation()
  // const [headerOpacity, setHeaderOpacity] = useState(0)
  const [headers, setHeaders] = useState({
    backgroundColor: 'transparent',
  })

  function updateHeaderOpacity(scrollPos) {
    console.log('hi')
    console.log('scrollPos', scrollPos)
    setScrollPos(scrollPos)

    const maxScroll = 50
    let opacity = Math.min(scrollPos / maxScroll, 1)

    let dominantColor = gradient
      ? gradient
      : // .background
        //     .match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/i)
        //     .slice(1, 4)
        //     .join(', ')
        '0, 0, 0'

    const newHeaders = {
      backgroundColor: `rgba(${dominantColor}, ${opacity})`,
    }

    console.log('after creating the styles ')

    setHeaders(newHeaders)

    console.log('after update the state')
  }

  useEffect(() => {
    const onScroll = (scrollPos) => updateHeaderOpacity(scrollPos)
    const unlisten = eventBus.on('stationDetailsScroll', onScroll)

    return () => {
      unlisten()
    }
  }, [gradient])

  function onShowModal() {
    setShowModal(true)
  }

  function onCloseModal() {
    setShowModal(false)
  }
  return (
    <header
      className="app-header"
      style={{ ...headers }}
      // style={{ backgroundColor: `rgba(10,10,10, ${headerOpacity})` }}
    >
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
        {currScrollPos > 466 ? (
          <div className="user-station-actions">
            <div className="play-button flex justify-center align-center"></div>
            <p>{station.name}</p>
          </div>
        ) : (
          ''
        )}
      </section>

      <div className="user-actions">
        <button className="sign-up pointer">Sign up</button>
        <Link to="/login">
          <button className="login pointer">Log in</button>
        </Link>
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
