import React from 'react'
import { stationService } from '../services/station.service.js'
import { useSelector } from 'react-redux'

export default function StationLikedSongs({ station }) {
  const stationNameClass = stationService.stationNameClass(station)
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  return (
    <>
      <img
        className="station-main-img"
        src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
        alt="liked songs main img"
      />
      <div className="station-info">
        <span className="playlist-word">Playlist</span>
        <h1 className={stationNameClass}>{station?.name}</h1>
        <img
          src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-green-logo-8.png"
          className="spotify-logo"
          alt="spotify logo"
        />
        <span className="logo">{user?.username}</span>
        <span className="dot"> • </span>
        <span className="songs-count">{user?.LikedSongs?.length} songs </span>
      </div>
    </>
  )
}
