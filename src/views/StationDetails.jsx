import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSpotifySvg } from '../services/SVG.service'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrStation, removeStation } from '../store/actions/station.actions'
import { FastAverageColor } from 'fast-average-color'
import { eventBus } from '../services/event-bus.service'
import StationHeaderDetails from '../cmps/StationHeaderDetails'
import StationSongList from '../cmps/StationSongList'
import { StationOptionsModal } from '../cmps/Modals/StationOptionsModal'
import {
  Recommended,
  RecommendedIndex,
} from '../cmps/Recommended/RecommendedIndex'
import { RecommindationModal } from '../cmps/Modals/RecommindationModal'
import SearchSongs from '../cmps/SearchSongs/SearchSongsIndex'
import { setCurrSong, setCurrSongIndex } from '../store/actions/song.actions'
import { DeleteStationModal } from '../cmps/Modals/DeleteStationModal'
import { BubblingHeart } from '../cmps/BubblingHeart'

export function StationDetails(props) {
  const [bgStyle, setBgStyle] = useState(null)
  const [bgBottomStyle, setBgBottomStyle] = useState(null)
  const colorCache = {}
  const [showRecommindationModal, setShowRecommindationModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [headerBg, setHeaderBg] = useState('transparent')
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  const stationDetailsRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )

  const firstRun = useRef(true)

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      console.log(' shloc kdetails')
    }
  }, [])
  const stationImg = useSelector(
    (storeState) => storeState.stationModule.currStationImg
  )
  const dispatch = useDispatch()

  useEffect(() => {
    loadStation()
  }, [params.id, station?.songs])

  useEffect(() => {
    const unsubscribe = eventBus.on('newStationCreated', setBgStyle)
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    updateImgUrlAndColor(station)
  }, [stationImg])

  useEffect(() => {
    const currentStationDetailsRef = stationDetailsRef.current
    const handleScroll = () => {
      const scrollPos = currentStationDetailsRef.scrollTop
      if (scrollPos > 375) {
        setHeaderBg('#1a1a1a')
      } else {
        setHeaderBg('transparent')
      }
      eventBus.emit('stationDetailsScroll', { scrollPos, bgStyle })
    }
    if (currentStationDetailsRef) {
      currentStationDetailsRef.addEventListener('scroll', handleScroll, {
        passive: true,
      })
    }
    return () => {
      if (currentStationDetailsRef) {
        currentStationDetailsRef.removeEventListener('scroll', handleScroll, {
          passive: true,
        })
      }
    }
  }, [bgStyle])

  function loadStation() {
    dispatch(setCurrStation(params.id))
  }

  function showStationModal(e) {
    const rect = e.target.getBoundingClientRect()
    setModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    })
    setShowModal(true)
  }
  console.log('details')
  function updateImgUrlAndColor(station) {
    if (!station) return
    const imgUrl = station.imgUrl
    if (imgUrl !== '') {
      getDominantColor(imgUrl)
    }
  }

  function handleCloseOptionModal() {
    setShowModal(false)
  }

  function handleShowDeleteModal() {
    handleCloseOptionModal()
    setShowDeleteModal(true)
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false)
  }

  function handleRemoveStation() {
    dispatch(removeStation(station._id))
    handleCloseDeleteModal()
    navigate(`/`)
  }

  function playFirstSongInStation() {
    dispatch(setCurrSong(station?._id, station?.songs[0]?._id))
    dispatch(setCurrSongIndex(station?._id, station?.songs[0]?._id))
    setIsPlaying(!isPlaying)
  }

  function handleShowRecommindationModal() {
    setShowModal(false)
    setShowRecommindationModal(true)
  }
  async function getDominantColor(imageSrc) {
    const cachedColor = colorCache[imageSrc]
    if (cachedColor) {
      const gradient = `linear-gradient(to bottom, ${cachedColor} 0%, ${cachedColor} 10%, ${cachedColor} 20%, ${cachedColor} 50%, black 140%, black 70%, black 100%)`

      setBgStyle(gradient)
      const bottomGradient = `linear-gradient(${cachedColor} -20%, #121212 9%)`
      setBgBottomStyle(bottomGradient)
      document.body.style.backgroundImage = gradient
      return
    }
    const fac = new FastAverageColor()
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    const corsProxyUrl = 'https://api.codetabs.com/v1/proxy?quest='
    img.src = corsProxyUrl + encodeURIComponent(imageSrc)
    img.onload = async () => {
      try {
        const color = await fac.getColorAsync(img)
        colorCache[imageSrc] = color
        setBgStyle({
          background: `linear-gradient(to bottom, ${color.rgb} 0%, ${color.rgb} 10%, ${color.rgb} 20%, ${color.rgb} 50%, black 140%, black 70%, black 100%)`,
        })
        setBgBottomStyle({
          background: `linear-gradient(${color.rgb} -30%, #121212 9%)`,
        })
      } catch (e) {
        console.error(e)
      }
    }
  }

  if (!station) return <div>Loading...</div>
  return (
    <section className="station-details" ref={stationDetailsRef}>
      <StationHeaderDetails bgStyle={bgStyle} station={station} />
      <div className="bottom-gradient" style={bgBottomStyle}>
        <div className="user-station-actions">
          {station?.songs?.length > 0 && (
            <>
              <div
                className="play-button flex justify-center align-center"
                onClick={playFirstSongInStation}
              >
                {isPlaying ? (
                  <span
                    title="Pause"
                    className="pause-button flex align-center justify-center title"
                    dangerouslySetInnerHTML={{
                      __html: getSpotifySvg('biggerPauseBtn'),
                    }}
                  ></span>
                ) : (
                  <span
                    title="Play"
                    className="play-button flex align-center justify-center title"
                    dangerouslySetInnerHTML={{
                      __html: getSpotifySvg('biggerPlayBtn'),
                    }}
                  ></span>
                )}
              </div>
              <span>
                <BubblingHeart
                  index={station._id}
                  item={station}
                  type="station"
                />
              </span>
            </>
          )}
          <span
            title={`More options for my ${station.name}`}
            onClick={(e) => showStationModal(e)}
            className="dots flex align-center justify-center option pointer"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('bigDots'),
            }}
          ></span>
        </div>
        <div className="station-songs-header" style={{ background: headerBg }}>
          <span className=" align-center justify-center">#</span>
          <span className="title flex align-center">Title</span>
          <span className=" align-center">Album</span>
          <span className=" align-center">Date added</span>
          <span
            className="time flex align-center justify-center"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('time'),
            }}
          ></span>
        </div>
        <div className="station-songs">
          <StationSongList station={station} />
        </div>
      </div>
      {/* {showModal && (
        <StationOptionsModal
          position={modalPosition}
          closeOptionsModal={handleCloseOptionModal}
          openRecommindationModal={handleShowRecommindationModal}
          onShowDeleteModal={handleShowDeleteModal}
        />
      )} */}

      {/* {showRecommindationModal && (
        <RecommindationModal
          closeRecommindationModal={() => setShowRecommindationModal(false)}
        />
      )}
      {station?.createdBy?.fullname !== 'system' &&
        station?.songs?.length > 0 && (
          <RecommendedIndex
            list={
              station?.songs?.slice(0, 5) ||
              station?.songs?.slice(0, station?.songs?.length - 1)
            }
            stationId={station?._id}
          />
        )}
      {station.createdBy?.fullname !== 'system' &&
        station?.songs?.length === 0 && (
          <SearchSongs stationId={station?._id} />
        )}
      {showDeleteModal && (
        <DeleteStationModal
          onCloseDeleteModal={handleCloseDeleteModal}
          onRemoveStation={handleRemoveStation}
        />
      )} */}
    </section>
  )
}
