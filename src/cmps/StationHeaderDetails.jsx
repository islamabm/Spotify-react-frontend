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
    <div className="station-header-content" style={bgStyle}>
      <img
        className="station-main-img"
        src={station.imgUrl}
        alt="station main img"
      />
      <div className="station-info">
        <span className="playlist-word">Playlist</span>
        <h1 className={stationNameClass()}>{station.name}</h1>
        <p className="station-description">{station.description}</p>
        <img
          src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-green-logo-8.png"
          className="spotify-logo"
          alt="spotify logo"
          />
        <span className="logo">Spotify </span>
        <span className="dot">• </span>
        <span className="songs-count"> {station.songs.length} songs </span>
      </div>
    </div>
  )
}
