import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getSpotifySvg } from '../services/SVG.service'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrStation,
  setCurrGradient,
} from '../store/actions/station.actions'
import { setCurrSong, setCurrSongIndex } from '../store/actions/song.actions'
import { FastAverageColor } from 'fast-average-color'
import { eventBus } from '../services/event-bus.service'
import StationHeaderDetails from './StationHeaderDetails'


export function StationDetails(props) {
  const [bgStyle, setBgStyle] = useState(null)
  const [bgBottomStyle, setBgBottomStyle] = useState(null)
  const colorCache = {}
  const params = useParams()
  const stationDetailsRef = useRef(null)
  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const stationImg = useSelector(
    (storeState) => storeState.stationModule.currStationImg
  )
  const dispatch = useDispatch()
  const [hoveredSongIdx] = useState(null)

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

  function onSongClicked(songId) {
    dispatch(setCurrSong(params.id, songId))
    dispatch(setCurrSongIndex(params.id, songId))
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
      const bottomGradient = `linear-gradient(${cachedColor} -20%, rgb(0, 0, 0) 12%)`
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
          background: `linear-gradient(${color.rgb} -30%, rgb(0, 0, 0) 12%)`,
        })
      } catch (e) {
        console.error(e)
      }
    }
  }

  function formatDate(dateString) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    const date = new Date(dateString)
    const monthIndex = date.getMonth()
    const day = date.getDate()
    const year = date.getFullYear()

    const formattedDate = `${months[monthIndex]} ${day}, ${year}`
    return formattedDate
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
          {station.songs.map((song, idx) => (
            <div key={idx} className="song">
              <span
                className={`song-idx flex align-center justify-center ${
                  hoveredSongIdx === idx ? 'hovered' : ''
                }`}
              >
                {idx + 1}
              </span>
              <span
                className={` small-play-btn flex align-center justify-center ${
                  hoveredSongIdx === idx ? 'hovered' : ''
                }`}
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('smallPlayButton'),
                }}
              ></span>
              <div className="song-details-container">
                <div className="img-container flex align-center justify-center">
                  <img
                    onClick={() => onSongClicked(song._id)}
                    className="song-img"
                    src={song.imgUrl}
                    alt="song img"
                  />
                </div>
                <div className="name-and-artist flex justify-center">
                  <span className="song-name">{song.title}</span>
                  <span className="song-artist">{song.artist}</span>
                </div>
              </div>
              <div className="album-name flex align-center">{song.album}</div>
              <div className="added-at flex align-center">
                {formatDate(song.addedAt)}
              </div>
              <div className="duration-container flex">
                <span
                  className="hidden dots"
                  dangerouslySetInnerHTML={{
                    __html: getSpotifySvg('emptyHeartIcon'),
                  }}
                ></span>
                <div className="duration">
                  {song.duration ? song.duration : '1:00'}
                </div>
                <span
                  className="hidden dots"
                  dangerouslySetInnerHTML={{
                    __html: getSpotifySvg('dots'),
                  }}
                ></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
