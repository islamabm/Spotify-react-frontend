import { getSpotifySvg } from '../services/SVG.service'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { UserModal } from './Modals/UserModal'
import { useState, useEffect } from 'react'
import { setCurrSong, setCurrSongIndex } from '../store/actions/song.actions'
import { useDispatch, useSelector } from 'react-redux'
import { eventBus } from '../services/event-bus.service'
import { MobileModal } from './Modals/MobileModal'
import { MobileSearchHeader } from '../views/MobileSearchHeader'

export function AppHeader() {
  const [showModal, setShowModal] = useState(false)
  const [showMobileModal, setShowMobileModal] = useState(false)
  const [currScrollPos, setScrollPos] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [headers, setHeaders] = useState({
    backgroundColor: 'transparent',
  })

  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const width = window.innerWidth

  useEffect(() => {
    const onScroll = ({ scrollPos, headerBg }) => {
      updateHeaderOpacity(scrollPos, headerBg)
    }
    const unlistenIndex = eventBus.on('stationIndexScroll', onScroll)
    if (
      location.pathname === '/' ||
      location.pathname === '/search' ||
      location.pathname === '/lyrics' ||
      location.pathname === '/user' ||
      (location.pathname.includes('/station/') && currScrollPos < 10)
    ) {
      setHeaders({
        backgroundColor: 'transparent',
      })
    } else {
      setHeaders({
        backgroundColor: '#121212',
      })
    }
    return () => {
      unlistenIndex()
    }
  }, [location.pathname])

  useEffect(() => {
    const onScroll = ({ scrollPos, bgStyle }) => {
      updateHeaderOpacity(scrollPos, bgStyle)
    }
    const unlistenDetails = eventBus.on('stationDetailsScroll', onScroll)

    if (
      location.pathname === '/' ||
      location.pathname === '/search' ||
      location.pathname === '/lyrics' ||
      location.pathname === '/user' ||
      (location.pathname.includes('/station/') && currScrollPos < 10)
    ) {
      setHeaders({
        backgroundColor: 'transparent',
      })
    } else {
      setHeaders({
        backgroundColor: '#121212',
      })
    }
    return () => {
      unlistenDetails()
    }
  }, [location.pathname])

  useEffect(() => {
    const onScroll = ({ scrollPos, bgStyle }) => {
      updateHeaderOpacity(scrollPos, bgStyle)
    }
    const unlistenDetails = eventBus.on('userDetailsScroll', onScroll)

    if (
      location.pathname === '/' ||
      location.pathname === '/search' ||
      location.pathname === '/lyrics' ||
      location.pathname === '/user' ||
      (location.pathname.includes('/station/') && currScrollPos < 10)
    ) {
      setHeaders({
        backgroundColor: 'transparent',
      })
    } else {
      setHeaders({
        backgroundColor: '#121212',
      })
    }
    return () => {
      unlistenDetails()
    }
  }, [location.pathname])

  function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b
    })

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ].join(',')
      : null
  }

  function updateHeaderOpacity(scrollPos, headerBg) {
    setScrollPos(scrollPos)
    const maxScroll = 50
    let opacity = Math.min(scrollPos / maxScroll, 1)

    let match = headerBg?.background?.match(/rgb\((\d+,\d+,\d+)\)/)
    let dominantColor = match ? match[1] : hexToRgb('#121212')

    const newHeaders = {
      backgroundColor: `rgba(${dominantColor}, ${opacity})`,
    }
    setHeaders(newHeaders)
  }

  function playFirstSong() {
    dispatch(setCurrSong(station?._id, station?.songs[0]._id))
    dispatch(setCurrSongIndex(station?._id, station?.songs[0]._id))
  }

  function onCloseModal() {
    setShowModal(false)
  }

  function playFirstSongInStation(event) {
    event.stopPropagation()
    dispatch(setCurrSong(station?._id, station?.songs[0]._id))
    dispatch(setCurrSongIndex(station?._id, station?.songs[0]._id))
    setIsPlaying(!isPlaying)
  }

  function onClickUserDetails() {
    setShowModal(!showModal)
  }

  function goToPreviousRoute() {
    navigate(-1)
  }

  function goToNextRoute() {
    navigate(+1)
  }

  function openMobileModal() {
    setShowMobileModal(true)
  }

  function handleCloseModal() {
    setShowMobileModal(false)
  }

  function goHome() {
    navigate('/')
  }

  function headerVisabillity() {
    if (width < 572) {
      if (location.pathname === '/') return 'none-sticky'
      if (
        location.pathname === '/mobileMediaPlayer' ||
        location.pathname === '/search' ||
        location.pathname === '/edit/mobile'
      )
        return 'display-none'
    }
    return ''
  }

  return (
    <>
      <header
        className={`app-header ${headerVisabillity()}`}
        style={{ padding: showMobileModal ? '0' : '20px', ...headers }}
      >
        <section className="arrows-and-input">
          <section className="arrows">
            <div className="black-circle">
              <span
                onClick={goToPreviousRoute}
                className="title"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('leftArrowIcon'),
                }}
              ></span>
            </div>
            <div className="black-circle">
              <span
                onClick={goToNextRoute}
                className="title"
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

          {currScrollPos > 300 && location.pathname === `/user` ? (
            <div className="user-in-header">
              <span
                onClick={goHome}
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('leftArrow'),
                }}
              ></span>
              <h1 className="user-name-in-header">{user?.username}</h1>
            </div>
          ) : (
            ''
          )}

          {currScrollPos > 300 &&
          location.pathname === `/station/${station?._id}` ? (
            <div
              onClick={playFirstSong}
              className="flex align-center justify-center station-options"
            >
              <div
                className="play-button flex justify-center"
                onClick={playFirstSongInStation}
              >
                {isPlaying ? (
                  <span
                    className="pause-button flex align-center justify-center title"
                    dangerouslySetInnerHTML={{
                      __html: getSpotifySvg('biggerPauseBtn'),
                    }}
                  ></span>
                ) : (
                  <span
                    className=" flex align-center justify-center title"
                    dangerouslySetInnerHTML={{
                      __html: getSpotifySvg('biggerPlayBtn'),
                    }}
                  ></span>
                )}
              </div>
              <p className="">{station.name}</p>
            </div>
          ) : (
            ''
          )}
        </section>

        {location.pathname !== '/mobile/search' && (
          <div className="user-actions flex justify-center align-center">
            {!user ? (
              <>
                {window.innerWidth < 460 ? (
                  <span
                    style={{ display: showMobileModal ? 'none' : '' }}
                    onClick={openMobileModal}
                    className="none-sticky white"
                    dangerouslySetInnerHTML={{
                      __html: getSpotifySvg('settings'),
                    }}
                  ></span>
                ) : (
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
                )}
              </>
            ) : (
              <>
                <span
                  className="user-details-header"
                  onClick={onClickUserDetails}
                >
                  <img
                    src={
                      user.imgUrl
                        ? user.imgUrl
                        : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg'
                    }
                    alt="user-img"
                  />
                </span>
              </>
            )}
          </div>
        )}
        {showModal && <UserModal onClose={onCloseModal} />}
        {showMobileModal && (
          <MobileModal closeModal={handleCloseModal} show={showMobileModal} />
        )}
        {location.pathname === '/mobile/search' && <MobileSearchHeader />}
      </header>
    </>
  )
}
