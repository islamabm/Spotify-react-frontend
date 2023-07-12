import React, { useEffect, useState } from 'react'
import { getSpotifySvg } from '../services/SVG.service'
import { eventBus } from '../services/event-bus.service'
import { MediaPlayer } from './MediaPlayer'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BubblingHeart } from './BubblingHeart'
import { FastAverageColor } from 'fast-average-color'
import { MobileMediaPlayer } from '../views/mobile/MobileMediaPlayer'
import { BottomNav } from '../cmps/Mobile/BottomNav'
import {
  setCurrSong,
  setCurrSongSvg,
  setCurrSongLyrics,
  setCurrSongIndex,
} from '../store/actions/song.actions'
export function AppFooter() {
  const [mute, setMute] = useState(false)
  const [volume, setVolume] = useState(50)
  const [isFirstClick, setIsFirstClick] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLyrics, setIsLyrics] = useState(false)
  const [bgStyle, setBgStyle] = useState(null)
  const song = useSelector((storeState) => storeState.songModule.currSong)
  const location = useLocation()
  const [currSong, setCurrSongFooter] = useState(song)
  const [isMobileMediaPlayer, setIsMobileMediaPlayer] = useState(false)
  const [isDisplayFooter, setIsDisplayFooter] = useState(true)

  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const colorCache = {}
  useEffect(() => {
    setCurrSongFooter(song)
    updateImgUrlAndColor(song)
  }, [song])
  useEffect(() => {
    const removeListener = eventBus.on('navigation:back', () => {
      setIsDisplayFooter(true)
    })

    return () => {
      removeListener()
    }
  }, [])

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
        colorCache[imageSrc] = color.rgb
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

  function displayMobileMediaPlayer() {
    setIsDisplayFooter(false)
    dispatch(setCurrSongSvg('pause'))
    if (window.innerWidth > 460) return
    // setIsMobileMediaPlayer(true)
    navigate('/mobileMediaPlayer')
  }

  function playSong(e) {
    e.stopPropagation()
    setIsPlaying(true)
    setIsFirstClick(true)
    if (isFirstClick) {
      dispatch(setCurrSong(station._id, song._id))
      dispatch(setCurrSongIndex(station._id, song._id))
      setIsFirstClick(false)
    } else {
      dispatch(setCurrSongSvg('play'))
    }
  }

  function pauseSong(e) {
    e.stopPropagation()
    setIsPlaying(false)
    dispatch(setCurrSongSvg('pause'))
  }

  return (
    <>
      {((window.innerWidth < 460 && currSong && isDisplayFooter) ||
        window.innerWidth > 460) && (
        <div
          className="app-footer"
          onClick={displayMobileMediaPlayer}
          style={window.innerWidth < 460 ? bgStyle : {}}
        >
          {/* {isMobileMediaPlayer && (
            <MobileMediaPlayer
              closeMediaPlayer={handleCloseMediaPlayer}
              open={isMobileMediaPlayer}
            />
          )} */}
          <div className="song-details">
            {currSong && (
              <>
                <div className="image">
                  <img
                    src={song ? song.imgUrl : station?.songs[0]?.imgUrl}
                    alt="song-img"
                  />
                </div>
                <div className="actor-name-song">
                  <p className={`song-name`}>
                    {song
                      ? window.innerWidth < 460 && song.title.length > 20
                        ? `${song.title.slice(0, 20)}...`
                        : song.title
                      : window.innerWidth < 460 &&
                        station?.songs[0]?.title.length > 20
                      ? `${station.songs[0].title.slice(0, 20)}...`
                      : station?.songs[0]?.title}
                  </p>
                  <p className="actor-name">
                    {song
                      ? window.innerWidth < 460 && song.artist.length > 25
                        ? `${song.artist.slice(0, 25)}...`
                        : song.artist
                      : window.innerWidth < 460 &&
                        station?.songs[0]?.artist.length > 25
                      ? `${station.songs[0].artist.slice(0, 25)}...`
                      : station?.songs[0]?.artist}
                  </p>
                </div>

                <div className="heart-picture-icons">
                  <span className="footer-heart">
                    <BubblingHeart index={song._id} item={song} type="song" />
                  </span>
                </div>
                <div className={`mobile-heart`}>
                  <span className="footer-heart">
                    <BubblingHeart
                      index={song?._id}
                      item={song}
                      type="stationMobile"
                    />
                  </span>
                  {isPlaying ? (
                    <button onClick={(e) => pauseSong(e)}>
                      <span
                        title="Pause"
                        className="play-pause"
                        dangerouslySetInnerHTML={{
                          __html: getSpotifySvg('pauseIcon'),
                        }}
                      ></span>
                    </button>
                  ) : (
                    <button onClick={(e) => playSong(e)}>
                      <span
                        title="Play"
                        className="play-pause"
                        dangerouslySetInnerHTML={{
                          __html: getSpotifySvg('playIcon'),
                        }}
                      ></span>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* {window.innerWidth > 460 && ( */}
          <div className="media-player">
            <MediaPlayer volume={volume} />
          </div>
          {/* )} */}
          <div className="song-details-two">
            {' '}
            {isLyrics ? (
              <button className="is-repeated">
                <span
                  title="Lyrics"
                  onClick={onRepeatClicked}
                  className="pointer title lyrics"
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
      )}
    </>
  )
}
