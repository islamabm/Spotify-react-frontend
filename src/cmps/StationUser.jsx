import React, { useState } from 'react'
import { stationService } from '../services/station.service.js'

import { EditUserStationModal } from './Modals/EditUserStationModal.jsx'
import emptyImg from '../assets/imgs/empty-img.png'

export default function StationUser({ station }) {
  const stationNameClass = stationService.stationNameClass(station)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  function handleEditModalOpen() {
    setIsEditModalOpen(true)
    // onEditModalOpen()
  }

  function handleEditModalClose() {
    setIsEditModalOpen(false)
  }
  return (
    <>
      <div className="station-main-img user-main-img justify-center align-center">
        <img
          className="default-image station-cover-img"
          src={station?.imgUrl ? station?.imgUrl : emptyImg}
          alt="user station img"
        ></img>
      </div>
      <div className="station-info">
        <span className="playlist-word">Playlist</span>
        <h1 className={stationNameClass} onClick={handleEditModalOpen}>
          {station?.name}
        </h1>
        {isEditModalOpen && (
          <EditUserStationModal
            onClose={handleEditModalClose}
            station={station}
          />
        )}
        {station?.songs?.length > 0 && (
          <span className="songs-count">
            {' '}
            {station?.songs?.length === 1
              ? `${station.songs.length} song`
              : `${station.songs.length} songs`}{' '}
          </span>
        )}
      </div>
    </>
  )
}
