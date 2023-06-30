import { getSpotifySvg } from '../services/SVG.service'
import { useLocation, Link } from 'react-router-dom'
import { UserModal } from './UserModal'
import { useState, useEffect } from 'react'
import { setCurrSong, setCurrSongIndex } from '../store/actions/song.actions'
import { useDispatch, useSelector } from 'react-redux'
import { eventBus } from '../services/event-bus.service'
export function AppHeader() {
  const [showModal, setShowModal] = useState(false)
  const [currScrollPos, setScrollPos] = useState(0)

  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const dispatch = useDispatch()
  const location = useLocation()

  const [headers, setHeaders] = useState({
    backgroundColor: 'transparent',
  })

  function updateHeaderOpacity(scrollPos, bgStyle) {
    setScrollPos(scrollPos)

    const maxScroll = 50
    let opacity = Math.min(scrollPos / maxScroll, 1)

    let match = bgStyle?.background.match(/rgb\((\d+,\d+,\d+)\)/)
    let dominantColor = match ? match[1] : '0,0,0'

    const newHeaders = {
      backgroundColor: `rgba(${dominantColor}, ${opacity})`,
    }
    setHeaders(newHeaders)
  }

  function playFirstSong() {
    dispatch(setCurrSong(station?._id, station?.songs[0]._id))
    dispatch(setCurrSongIndex(station?._id, station?.songs[0]._id))
  }

  useEffect(() => {
    const onScroll = ({ scrollPos, bgStyle }) =>
      updateHeaderOpacity(scrollPos, bgStyle)
    const unlisten = eventBus.on('stationDetailsScroll', onScroll)

    return () => {
      unlisten()
    }
  }, [])

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

        {currScrollPos > 300 ? (
          <div
            onClick={playFirstSong}
            className="flex align-center justify-center station-options"
          >
            <div className="play-button flex justify-center align-center"></div>
            <p className="">{station.name}</p>
          </div>
        ) : (
          ''
        )}
      </section>

      <div className="user-actions flex justify-center align-center">
        <button className="sign-up pointer">Sign up</button>
        <Link to="/login">
          <button className="login pointer flex justify-center align-center">
            Log in
          </button>
        </Link>

        <span
          className="user-icon pointer flex justify-center align-center"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('userIcon'),
          }}
        ></span>
      </div>
      {showModal && <UserModal onClose={onCloseModal} />}
    </header>
  )
}
