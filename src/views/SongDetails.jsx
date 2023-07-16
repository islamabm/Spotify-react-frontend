import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { BubblingHeart } from '../cmps/BubblingHeart'
import { getSpotifySvg } from '../services/SVG.service'
import { FastAverageColor } from 'fast-average-color'
import { eventBus } from '../services/event-bus.service'
export function SongDetails() {
  const [bgStyle, setBgStyle] = useState(null)
  const [bgBottomStyle, setBgBottomStyle] = useState(null)
  const song = useSelector((storeState) => storeState.songModule.currSong)
  const colorCache = {}
  const songDetailsRef = useRef(null)

  const lyrics = useSelector(
    (storeState) => storeState.songModule.currSongLyrics
  )
  const isPlaying = false
  let modifiedTitle = song?.title
  if (song?.title && song.title.includes('-') && song.title.includes('(')) {
    modifiedTitle = song.title.split('-')[1].split('(')[0].trim()
  }

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
  useEffect(() => {
    const currentSongDetailsRef = songDetailsRef.current
    const handleScroll = () => {
      const scrollPos = currentSongDetailsRef.scrollTop
      //   if (scrollPos > 375) {
      //     setHeaderBg('#1a1a1a')
      //   } else {
      //     setHeaderBg('transparent')
      //   }
      eventBus.emit('songDetailsScroll', { scrollPos, bgStyle })
    }
    if (currentSongDetailsRef) {
      currentSongDetailsRef.addEventListener('scroll', handleScroll, {
        passive: true,
      })
    }
    return () => {
      if (currentSongDetailsRef) {
        currentSongDetailsRef.removeEventListener('scroll', handleScroll, {
          passive: true,
        })
      }
    }
  }, [bgStyle])
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
    <section className="song-details-mobile-preview" ref={songDetailsRef}>
      <div className="song-details-mobile" style={bgStyle}>
        <div className="song-details-mobile-image">
          <img src={song?.imgUrl} />
        </div>
        <h1>{modifiedTitle}</h1>
        <div className="song-details-mobile-album">
          <div className="song-details-mobile-album-image">
            {/* this is must be artist image but we dont have this in our object */}
            <img src={song?.imgUrl} />
          </div>
          <p>{song?.album}</p>
        </div>
        <div className="song-details-mobile-song">
          <span>{modifiedTitle}</span>
          <span className="dot">•</span>
          <span>2022</span>
          <span className="dot">•</span>
          <span>3:39</span>
        </div>
        <div className="song-details-mobile-actions">
          <div className="first-section">
            <button className="bub-button">
              <span className="nice-heart">
                <BubblingHeart
                  index={song?._id}
                  item={song}
                  type="song-details"
                />
              </span>
            </button>
            <button className="dots-button">
              <span
                className="dots-span"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('mobileDots'),
                }}
              ></span>
            </button>
          </div>
          <div className="play-button flex justify-center align-center">
            {isPlaying ? (
              <button>
                <span
                  title="Pause"
                  className="pause-button flex align-center justify-center title lyrics-play"
                  dangerouslySetInnerHTML={{
                    __html: getSpotifySvg('biggerPauseBtn'),
                  }}
                ></span>
              </button>
            ) : (
              <button>
                <span
                  title="Play"
                  className="play-button flex align-center justify-center title lyrics-play"
                  dangerouslySetInnerHTML={{
                    __html: getSpotifySvg('biggerPlayBtn'),
                  }}
                ></span>
              </button>
            )}
          </div>
        </div>
      </div>
      <article className="song-details-lyrics" style={bgBottomStyle}>
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
