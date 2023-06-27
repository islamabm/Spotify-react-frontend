import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getSpotifySvg } from '../services/SVG.service'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrStation,
  setCurrGradient,
} from '../store/actions/station.actions'
import { FastAverageColor } from 'fast-average-color'
import { eventBus } from '../services/event-bus.service'
import StationHeaderDetails from '../cmps/StationHeaderDetails'
import StationSongList from '../cmps/StationSongList'
import { StationOptionsModal } from '../cmps/StationOptionsModal'

export function StationDetails(props) {
  const [bgStyle, setBgStyle] = useState(null)
  const [bgBottomStyle, setBgBottomStyle] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const colorCache = {}
  const params = useParams()
  const stationDetailsRef = useRef(null)
  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  console.log('station in the station details please', station)
  const stationImg = useSelector(
    (storeState) => storeState.stationModule.currStationImg
  )
  const dispatch = useDispatch()

  useEffect(() => {
    loadStation()
  }, [params.id])

  useEffect(() => {
    updateImgUrlAndColor(station)
  }, [stationImg])

  useEffect(() => {
    const currentStationDetailsRef = stationDetailsRef.current
    const handleScroll = () => {
      const scrollPos = currentStationDetailsRef.scrollTop
      console.log('StationDetails scroll position:', scrollPos)

      eventBus.emit('stationDetailsScroll', scrollPos)
    }
    if (currentStationDetailsRef) {
      dispatch(setCurrGradient(bgStyle))
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
  }, [])

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

  function updateImgUrlAndColor(station) {
    if (!station) return
    const imgUrl = station.imgUrl
    if (imgUrl !== '') {
      getDominantColor(imgUrl)
    }
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
      <div className="bottom gradient" style={bgBottomStyle}>
        <div className="user-station-actions">
          <div className="play-button flex justify-center align-center"></div>
          <span
            className="heart flex align-center justify-center"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('bigFilledHeart'),
            }}
          ></span>
          <span
            onClick={(e) => showStationModal(e)}
            className="dots flex align-center justify-center"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('bigDots'),
            }}
          ></span>
        </div>
        <div className="station-songs">
          <div className="station-songs-header">
            <span className="flex align-center justify-center">#</span>
            <span className="title flex align-center">Title</span>
            <span className="flex align-center">Album</span>
            <span className="flex align-center">Date added</span>
            <span
              className="time flex align-center justify-center"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('time'),
              }}
            ></span>
          </div>
          <StationSongList station={station} />
        </div>
      </div>
      {showModal && <StationOptionsModal position={modalPosition} />}
    </section>
  )
}
