import React, { useState } from 'react'
import { stationService } from '../services/station.service.js'

import { EditUserStationModal } from './Modals/EditUserStationModal.jsx'
import { useSelector } from 'react-redux'

export default function StationUser({ station }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const stationNameClass = stationService.stationNameClass(station)

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
          src={station?.imgUrl}
          alt="user station img"
        ></img>
      </div>
      <div className="station-info">
        <span className="playlist-word">Playlist</span>
        <h1 className={stationNameClass} onClick={handleEditModalOpen}>
          {station?.name}
        </h1>
        <div className="user-details-section">
          <span className="user-img-details">
            <img src={user?.imgUrl} />
          </span>
          <span>{user?.username} •</span>
          {station?.songs?.length > 0 && (
            <span className="songs-count">
              {' '}
              {station?.songs?.length === 1
                ? `${station.songs.length} song`
                : `${station.songs.length} songs`}{' '}
            </span>
          )}
        </div>
      </div>
      {isEditModalOpen && (
        <EditUserStationModal
          onClose={handleEditModalClose}
          station={station}
        />
      )}
    </>
  )
}
