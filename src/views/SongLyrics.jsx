import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FastAverageColor } from 'fast-average-color'
import { getSpotifySvg } from '../services/SVG.service'
export function SongLyrics() {
  const song = useSelector((storeState) => storeState.songModule.currSongAction)
  // const stationNameClass = stationService.stationNameClass(song)
  const lyrics = useSelector(
    (storeState) => storeState.songModule.currSongLyrics
  )
  const [bgStyle, setBgStyle] = useState(null)
  const [bgBottomStyle, setBgBottomStyle] = useState(null)
  const colorCache = {}

  useEffect(() => {
    updateImgUrlAndColor(song)
  }, [song])

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

  return (
    <section className="song-lyrics-section">
      {/* <section className="song-lyrics-section"> */}
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
        <div className="play-button flex justify-center align-center"></div>
        <span
          className="heart flex align-center justify-center"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('lyricsHeart'),
          }}
        ></span>

        <span
          className="dots flex align-center justify-center"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('bigDots'),
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
    </section>
  )
}
