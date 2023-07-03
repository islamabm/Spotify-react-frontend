import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import FastAverageColor from "fast-average-color";

export function SongLyrics() {
  const song = useSelector((storeState) => storeState.songModule.currSong)

  const lyrics = useSelector(
    (storeState) => storeState.songModule.currSongLyrics
  )

  //   const [bgStyle, setBgStyle] = useState({});
  //   const [colorCache, setColorCache] = useState({});

  //   useEffect(() => {
  // dispatch(fetchSongDetails(song));
  // dispatch(fetchSongLyrics(song));
  // updateImgUrlAndColor(song);
  //   }, [song]);

  //   const changeSong = async song => {
  //     try {
  //       dispatch(fetchSongDetails(song));
  //       dispatch(fetchSongLyrics(song));
  //       updateImgUrlAndColor(song);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   const getDominantColor = async imageSrc => {
  //     const cachedColor = colorCache[imageSrc];
  //     if (cachedColor) {
  //       const gradient = `background: linear-gradient(to bottom, ${cachedColor} 0%, black 30%, ${cachedColor} 70%, black 100%)`;
  //       setBgStyle(gradient);
  //       document.body.style.backgroundImage = gradient;
  //       return;
  //     }

  //     const fac = new FastAverageColor();
  //     const img = new Image();
  //     img.crossOrigin = "Anonymous";
  //     const corsProxyUrl = "https://api.codetabs.com/v1/proxy?quest=";
  //     img.src = corsProxyUrl + encodeURIComponent(imageSrc);
  //     img.onload = async () => {
  //       try {
  //         const color = await fac.getColorAsync(img);
  //         setColorCache({ ...colorCache, [imageSrc]: color });
  //         setBgStyle({
  //           background: `linear-gradient(to bottom, ${color.rgb} 0%, black 30%, black 70%, black 100%)`
  //         });
  //       } catch (e) {
  //         console.error(e);
  //       }
  //     };
  //   };

  //   const stationNameClass = () => {
  //     const words = song.title.split(" ").length;
  //     if (words <= 3) {
  //       return "short-station-name";
  //     } else if (words <= 5) {
  //       return "long-station-name";
  //     } else {
  //       return "huge-station-name";
  //     }
  //   };

  return (
    // <section className="song-details-section" style={bgStyle}>
    <section className="song-lyrics-section">
      {song && (
        <div className="song-details-wrapper header-content">
          <img
            className="station-cover-img"
            src={song?.imgUrl}
            alt="Album cover"
          />
          <div className="song-details-header">
            {/* <h1 className={stationNameClass()}>{song.title}</h1> */}
            <h1>{song?.title}</h1>
            <h2 className="song-details-artist">{song?.artist}</h2>
            <small>Album - {song?.album}</small>
          </div>
        </div>
      )}
      <article className="song-details-lyrics">
        {lyrics ? (
          lyrics.map((line, index) => <div key={index}>{line?.text}</div>)
        ) : (
          <div>Loading lyrics...</div>
        )}
      </article>
    </section>
  )
}
