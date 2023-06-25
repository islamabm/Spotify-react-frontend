import React from "react"

export default function StationHeaderDetails(props) {
  const bgStyle = props.bgStyle
  const station = props.station

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
  return (
    // always the same
    <div className="station-header-content" style={bgStyle}>
      // couple conditions
      <img
        className="station-main-img"
        src={station.imgUrl}
        alt="station main img"
      />
      // the same
      <div className="station-info">
        <span className="playlist-word">Playlist</span>
        <h1 className={stationNameClass()}>{station.name}</h1>
        <p className="station-description">{station.description}</p>
        // if its build in
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/74/Spotify_App_Logo.svg"
          className="spotify-logo"
          />
        <span className="logo">Spotify </span>
        <span className="dot">• </span>
          // if it is Liked songs or my playlist only user name and songs
        <span className="songs-count"> {station.songs.length} songs </span>
      </div>
    </div>
  )
}
