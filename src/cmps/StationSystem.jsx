import React from 'react'
import { stationService } from '../services/station.service.js'

export default function StationSystem({ station }) {
  const stationNameClass = stationService.stationNameClass(station)
  console.log('station in system station', station)
  return (
    <>
      <img
        className="station-main-img"
        src={station.imgUrl}
        alt="station main img"
      />
      <div className="station-info">
        <span className="playlist-word">Playlist</span>
        <h1 className={stationNameClass}>{station.name}</h1>
        <p className="station-description">{station.description}</p>
        <img
          src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-green-logo-8.png"
          className="spotify-logo"
          alt="spotify logo"
        />
        <span className="logo">Spotify</span>
        <span className="dot">• </span>
        <span className="songs-count"> {station.songs?.length} songs </span>
      </div>
    </>
  )
}
