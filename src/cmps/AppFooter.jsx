import React, { useEffect, useState } from 'react'
import { getSpotifySvg } from '../services/SVG.service'
import { setCurrSongLyrics } from '../store/actions/song.actions'
import { MediaPlayer } from './MediaPlayer'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BubblingHeart } from './BubblingHeart'
import { FastAverageColor } from 'fast-average-color'
export function AppFooter() {
  const [mute, setMute] = useState(false)
  const [volume, setVolume] = useState(50)
  const [isLyrics, setIsLyrics] = useState(false)
  const [bgStyle, setBgStyle] = useState(null)
  const song = useSelector((storeState) => storeState.songModule.currSong)
  const [currSong, setCurrSong] = useState(song)
  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const colorCache = {}
  useEffect(() => {
    setCurrSong(song)
    updateImgUrlAndColor(song)
  }, [song])

  function handleVolumeChange(event) {
    setVolume(event.target.value)
  }

  function onRepeatClicked() {
    setIsLyrics(!isLyrics)
  }

  function onLyricsClicked() {
    dispatch(setCurrSongLyrics(song.artist, song.title))
    navigate('/only/lyrics')
  }

  function setSvg() {
    if (volume > 80) return 'volumeIcon'
    if (volume > 30 && volume < 80) return 'mediumVolumeIcon'
    if (volume > 1 && volume < 30) return 'veryShortVolumeIcon'
    else return 'muteIcon'
  }

  function updateImgUrlAndColor(song) {
    if (!song) return
    const imgUrl = song.imgUrl
    if (imgUrl !== '') {
      getDominantColor(imgUrl)
    }
  }

  async function getDominantColor(imageSrc) {
    const cachedColor = colorCache[imageSrc]
    if (cachedColor) {
      setBgStyle({ backgroundColor: cachedColor })

      document.body.style.backgroundColor = cachedColor
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
        colorCache[imageSrc] = color.rgb // I assumed color.rgb returns color in rgb format
        setBgStyle({ backgroundColor: color.rgb })
      } catch (e) {
        console.error(e)
      }
    }
  }

  function onToggleMute() {
    if (setSvg() === 'muteIcon') {
      setVolume(100)
      setMute(false)
    } else {
      setVolume(0)
      setMute(true)
    }
  }

  return (
    <div className="app-footer" style={window.innerWidth < 460 ? bgStyle : {}}>
      {/* <div className="mobile"> */}
      <div className="song-details">
        {/* <div> */}
        {currSong && (
          <>
            <div className="image">
              <img
                src={song ? song.imgUrl : station?.songs[0]?.imgUrl}
                alt="song-img"
              />
            </div>
            <div className="actor-name-song">
              <p className="song-name">
                {song ? song.title : station?.songs[0]?.title}
              </p>
              <p className="actor-name">
                {song ? song.artist : station?.songs[0]?.artist}
              </p>
            </div>

            <div className="heart-picture-icons">
              <span className="footer-heart">
                <BubblingHeart index={song._id} item={song} type="song" />
              </span>
            </div>
            <div className="mobile-heart">
              <span className="footer-heart">
                <BubblingHeart index={song?._id} item={song} type="song" />
              </span>
              <span
                // title={isPlaying ? "Pause" : "Play"}
                className="special-i pointer play-pause"
                // onClick={handlePlayPauseClick}
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('playIcon'),
                  // __html: isPlaying
                  //   ? getSpotifySvg("pauseIcon")
                  //   : getSpotifySvg("playIcon"),
                }}
              ></span>
            </div>
          </>
        )}
        {/* </div> */}
      </div>

      <div className="media-player">
        <MediaPlayer volume={volume} />
      </div>
      <div className="song-details-two">
        {' '}
        {isLyrics ? (
          <button className="is-repeated">
            <span
              title="Lyrics"
              onClick={onRepeatClicked}
              className="pointer title"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('lyricsIcon'),
              }}
            ></span>{' '}
          </button>
        ) : (
          <span
            title="Lyrics"
            onClick={onLyricsClicked}
            className="pointer title lyrics"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('lyricsIcon'),
            }}
          ></span>
        )}
        <span
          title={mute ? 'Unmute' : 'Mute'}
          onClick={onToggleMute}
          className="pointer title mute"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg(setSvg()),
          }}
        ></span>
        <div className="slider-container">
          <input
            className="range-slider"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
          />
          <span className="range-thumb"></span>
        </div>
      </div>
    </div>
    // </div>
  )
}
