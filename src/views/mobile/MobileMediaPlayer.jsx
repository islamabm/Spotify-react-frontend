import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getSpotifySvg } from '../../services/SVG.service'
import { BubblingHeart } from '../../cmps/BubblingHeart'
import { MediaPlayer } from '../../cmps/MediaPlayer'
import { FastAverageColor } from 'fast-average-color'

export function MobileMediaPlayer({ closeMediaPlayer, open }) {
  const song = useSelector((storeState) => storeState.songModule.currSong)
  const [bgStyle, setBgStyle] = useState(null)
  const colorCache = {}
  const navigate = useNavigate()

  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )

  useEffect(() => {
    updateImgUrlAndColor(song)
  }, [song?.imgUrl])

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
      const gradient = `linear-gradient(to bottom, ${cachedColor} 0%, ${cachedColor} 10%, ${cachedColor} 20%, ${cachedColor} 50%, black 140%, black 70%, black 100%)`

      setBgStyle(gradient)
      const bottomGradient = `linear-gradient(${cachedColor} -20%, #121212 9%)`

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
      } catch (e) {
        console.error(e)
      }
    }
  }

  function goToPreviousRoute() {
    closeMediaPlayer()
  }

  return (
    <>
      <section
        className={`song-details-container-mobile flex column align-center justify-center ${
          open ? 'open' : 'close'
        }`}
        // className="song-details-container-mobile flex column align-center justify-center"
        style={bgStyle}
      >
        <div className="media-player-header flex align-center">
          <span
            onClick={goToPreviousRoute}
            className="arrow"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('mobileArrow'),
            }}
          ></span>

          <span className="station-name">{station?.name}</span>
        </div>
        <div className="song-details">
          <img
            src={song ? song?.imgUrl : station?.songs[0]?.imgUrl}
            alt="song-img"
          />
          <div className="artist-name-heart flex align-center">
            <div className="artist-name">
              <p className="song-name">
                {song ? song.title : station?.songs[0]?.title}
              </p>
              <p className="artist-name">
                {song ? song.artist : station?.songs[0]?.artist}
              </p>
            </div>
            <BubblingHeart index={song?._id} item={song} type="stationMobile" />
          </div>
        </div>
        <div className="media-player">
          <MediaPlayer />
        </div>
      </section>
    </>
  )
}
