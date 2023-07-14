import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FastAverageColor } from 'fast-average-color'

export function OnlyLyrics() {
  const [bgStyle, setBgStyle] = useState(null)

  const song = useSelector((storeState) => storeState.songModule.currSong)
  const lyrics = useSelector(
    (storeState) => storeState.songModule.currSongLyrics
  )

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

  return (
    <section className="only-song-lyrics" style={bgStyle}>
      {lyrics ? (
        lyrics.map((line, index) => <div key={index}>{line?.text}</div>)
      ) : (
        <div className="loader"></div>
      )}
    </section>
  )
}
