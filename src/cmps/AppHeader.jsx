import { getSpotifySvg } from '../services/SVG.service'
import { useLocation, Link } from 'react-router-dom'
import { UserModal } from './Modals/UserModal'
import { useState, useEffect } from 'react'
import { setCurrSong, setCurrSongIndex } from '../store/actions/song.actions'
import { doLogout } from '../store/actions/user.actions'
import { useDispatch, useSelector } from 'react-redux'
import { eventBus } from '../services/event-bus.service'
export function AppHeader() {
  const [showModal, setShowModal] = useState(false)
  const [currScrollPos, setScrollPos] = useState(0)

  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
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

  function handleLogout() {
    dispatch(doLogout())
  }
  useEffect(() => {
    const onScroll = ({ scrollPos, bgStyle }) =>
      updateHeaderOpacity(scrollPos, bgStyle)
    const unlisten = eventBus.on('stationDetailsScroll', onScroll)

    if (location.pathname === '/' || location.pathname === '/search') {
      setHeaders({
        backgroundColor: 'rgba(0,0,0,0)',
      })
    } else {
      setHeaders({
        backgroundColor: 'transparent',
      })
    }

    return () => {
      unlisten()
    }
  }, [location])

  function onShowModal() {
    setShowModal(true)
  }

  function onCloseModal() {
    setShowModal(false)
  }
  return (
    <header className="app-header" style={{ ...headers }}>
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
          <div className="flex align-center justify-center input-container">
            <span
      dangerouslySetInnerHTML={{
        __html: getSpotifySvg('smallerSearchIcon'),
      }}
    ></span>
            <input placeholder="What do you want to listen to?" />
          </div>
        )}

        {currScrollPos > 300 &&
        location.pathname === `/station/${station?._id}` ? (
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
        {!user ? (
          <>
            <Link to="/signup">
              <button className="sign-up pointer">Sign up</button>
            </Link>
            <Link to="/login">
              <button className="login pointer flex justify-center align-center">
                Log in
              </button>
            </Link>
          </>
        ) : (
          <>
            <button onClick={handleLogout} className="sign-up  pointer">
              Log out
            </button>
            <Link to="/user">
              <span className="user-details-header">
                <img
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                  alt="user-img"
                />
                {user?.username}
              </span>
            </Link>
          </>
        )}
      </div>
      {showModal && <UserModal onClose={onCloseModal} />}
    </header>
  )
}
