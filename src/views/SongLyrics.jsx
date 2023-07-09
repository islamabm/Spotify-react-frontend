import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FastAverageColor } from "fast-average-color"
import { getSpotifySvg } from "../services/SVG.service"
import {
  setCurrSong,
  setCurrSongSvg,
  setCurrSongIndex,
  setCurrDirection,
} from "../store/actions/song.actions"

import { SongOptionsModal } from "../cmps/Modals/SongOptionsModal"
import { BubblingHeart } from "../cmps/BubblingHeart"
export function SongLyrics() {
  const [showModal, setShowOptionsModal] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const [isFirstClick, setIsFirstClick] = useState(true)
  const [bgStyle, setBgStyle] = useState(null)
  const [bgBottomStyle, setBgBottomStyle] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const song = useSelector((storeState) => storeState.songModule.currSongAction)
  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const lyrics = useSelector(
    (storeState) => storeState.songModule.currSongLyrics
  )
  const dispatch = useDispatch()
  const colorCache = {}

  useEffect(() => {
    updateImgUrlAndColor(song)
  }, [song])

  function updateImgUrlAndColor(song) {
    if (!song) return
    const imgUrl = song.imgUrl
    if (imgUrl !== "") {
      getDominantColor(imgUrl)
    }
  }

  function showSongOptionsModal(e) {
    e.stopPropagation()
    dispatch(setCurrDirection("right"))
    const rect = e.target.getBoundingClientRect()
    setModalPosition({
      top: rect.top + window.scrollY - 100,
      left: rect.left + window.scrollX + 200,
    })
    setShowOptionsModal((prevState) => !prevState)
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
    img.crossOrigin = "Anonymous"
    const corsProxyUrl = "https://api.codetabs.com/v1/proxy?quest="
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

  function playSong() {
    setIsPlaying(true)
    setIsFirstClick(true)
    if (isFirstClick) {
      dispatch(setCurrSong(station._id, song._id))
      dispatch(setCurrSongIndex(station._id, song._id))
      setIsFirstClick(false)
    } else {
      dispatch(setCurrSongSvg("play"))
    }
  }

  function pauseSong() {
    setIsPlaying(false)
    dispatch(setCurrSongSvg("pause"))
  }

  // function addSongToLoveSongs() {
  //   dispatch(updateUser(song, user))
  // }

  return (
    <section className="song-lyrics-section">
      {song && (
        <div
          className="song-details-wrapper station-header-content"
          style={bgStyle}
        >
          <div className="image">
            <img
              className="station-cover-img"
              src={song?.imgUrl}
              alt="Album cover"
            />
          </div>
          <div className="song-details-header">
            <h1>Song</h1>
            <h1 className="special-h">{song?.title}</h1>
            <div className="artist-details">
              <div className="small-image">
                <img src={song?.imgUrl} alt="Album cover" />
              </div>
              <small className="song-details-artist">{song?.artist}</small>
              <small>Album - {song?.album}</small>
            </div>
          </div>
        </div>
      )}
      <div className="song-details" style={bgBottomStyle}>
        <div className="play-button flex justify-center align-center">
          {isPlaying ? (
            <button onClick={pauseSong}>
              <span
                title="Pause"
                className="pause-button flex align-center justify-center title lyrics-play"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg("biggerPauseBtn"),
                }}
              ></span>
            </button>
          ) : (
            <button onClick={playSong}>
              <span
                title="Play"
                className="play-button flex align-center justify-center title lyrics-play"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg("biggerPlayBtn"),
                }}
              ></span>
            </button>
          )}
        </div>
        <span>
          <BubblingHeart index={song?._id} item={song} type="lyrics" />
        </span>

        <span
          onClick={(e) => showSongOptionsModal(e)}
          className="dots flex align-center justify-center"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg("bigDots"),
          }}
        ></span>
      </div>

      <article className="song-details-lyrics">
        <h2>Lyrics</h2>
        {lyrics ? (
          lyrics.map((line, index) => <div key={index}>{line?.text}</div>)
        ) : (
          <div className="loader"></div>
        )}
      </article>
      {showModal && (
        <SongOptionsModal
          station={station}
          position={modalPosition}
          closeModal={() => setShowOptionsModal(false)}
        />
      )}
    </section>
  )
}
