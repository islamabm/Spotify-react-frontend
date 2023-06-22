import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { getSpotifySvg } from "../services/SVG.service"
import { useDispatch, useSelector } from "react-redux"
import { setCurrStation } from "../store/actions/station.actions"
import { setCurrSong } from "../store/actions/song.actions"
import { FastAverageColor } from 'fast-average-color'

export function StationDetails(props) {
  // const [station, setStation] = useState(null)
  const colorCache = {}
  const stationDetailsHeader = useRef(null)
  const bottomHalf = useRef(null);
  const params = useParams()

  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const song = useSelector((storeState) => storeState.songModule.currSong)
  console.log("song", song)
  const dispatch = useDispatch()

  useEffect(() => {
    loadStation()
  }, [params.id])

  function loadStation() {
    dispatch(setCurrStation(params.id))
    // try {
    //   const station = await stationService.getById(params.id)
    //   setStation(station)
    // } catch (error) {
    //   console.log('error:', error)
    // }
  }

  function onSongClicked(songId) {
    dispatch(setCurrSong(params.id, songId))
  }

  function updateBodyBackgroundColor(color) {
    const darkShade =getShade(color, 0.07)
    const headerShade =getShade(color, 0.4)

    const gradient = `linear-gradient(to bottom, ${color.rgba}, ${headerShade.rgba})`
    const darkGradient = `linear-gradient(to bottom, ${darkShade.rgba} 0%, rgba(0, 0, 0, 1) 30%)`

    document.body.style.backgroundImage = gradient
    if(stationDetailsHeader.current) stationDetailsHeader.current.style.backgroundImage = gradient
    if(bottomHalf.current) bottomHalf.current.style.backgroundImage = darkGradient    
  }
  function getShade(color, shadeLevel) {
    return {
      ...color,
      rgba: `rgba(${Math.round(color.value[0] * shadeLevel)}, ${Math.round(
        color.value[1] * shadeLevel
      )}, ${Math.round(color.value[2] * shadeLevel)}, 0.7)`,
    }
  }
  function updateImgUrlAndColor(station) {
    if (!station) return
    let imgUrl = ''
    if (station.name === 'Liked songs') {
      imgUrl = 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png'
    } else {
      imgUrl =
        station.imgUrl ||
        (station.songs && station.songs.length > 0
          ? station.songs[0].imgUrl
          : '')
    }
    if (imgUrl !== '') {
     getDominantColor(imgUrl)
    }
  }

  async function getDominantColor(imageSrc) {
    const cachedColor = colorCache[imageSrc]
    if (cachedColor) {
     updateBodyBackgroundColor(cachedColor)
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
       updateBodyBackgroundColor(color)
      } catch (e) {
        console.error(e)
      }
    }
  }

  function stationNameClass() {
    const words = station.name.split(" ").length
    if (words <= 3) {
      return "short-station-name"
    } else if (words <= 5) {
      return "long-station-name"
    } else {
      return "huge-station-name"
    }
  }

  function formatDate(dateString) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
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
    <section ref={stationDetailsHeader} className="station-details ">
      <div className="station-header-content">
        <img
          className="station-main-img"
          src={station.imgUrl}
          alt="station main img"
        />
        <div className="station-info">
          <span className="playlist-word">Playlist</span>
          <h1 className={stationNameClass()}>{station.name}</h1>
          <p className="station-description">{station.description}</p>
          <span className="logo">Spotify </span>
          <span className="dot">• </span>
          <span className="songs-count"> {station.songs.length} songs </span>
        </div>
      </div>
      <div ref={bottomHalf} className="station-songs">
        <div className="station-songs-header">
          <span className="flex align-center justify-center">#</span>
          <span className="title flex align-center">Title</span>
          <span className="flex align-center">Album</span>
          <span className="flex align-center">Date added</span>
          <span className="flex align-center justify-center">#</span>
        </div>
        {station.songs.map((song, idx) => (
          <div key={idx} className="song">
            <span className="song-idx flex align-center justify-center">
              {idx + 1}
            </span>
            <div className="song-details-container">
              <div className="img-container flex align-center justify-center">
                <img className="song-img" src={song.imgUrl} alt="song img" />
              </div>
              <div className="name-and-artist flex justify-center">
                <span onClick={onSongClicked(song._id)} className="song-name">
                  {song.title}
                </span>
                <span className="song-artist">{song.artist}</span>
              </div>
            </div>
            <div className="album-name flex align-center">{song.album}</div>
            <div className="added-at flex align-center">
              {formatDate(song.addedAt)}
            </div>
            <div className="duration-container flex">
              <input className="hidden" type="checkbox" />
              <div className="duration">
                {song.duration ? song.duration : "1:00"}
              </div>
              <span
                className="hidden dots"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg("dots"),
                }}
              ></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
