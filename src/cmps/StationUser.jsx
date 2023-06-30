import React, { useState } from 'react'
import { stationService } from '../services/station.service.js'
import { getSpotifySvg } from '../services/SVG.service.js'
import { EditUserStationModal } from '../cmps/EditUserStationModal'
import emptyImg from '../assets/imgs/empty-img.png'
export default function StationUser({ station }) {
  const stationNameClass = stationService.stationNameClass(station)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true)
  }

  const handleEditModalClose = () => {
    setIsEditModalOpen(false)
  }
  return (
    <>
      <div className="station-main-img user-main-img justify-center align-center">
        {/* <span
          className="music-note"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('userStationImg'),
          }}
        ></span> */}
        <img
          className="default-image station-cover-img"
          src={station.imgUrl ? station.imgUrl : emptyImg}
          alt="user station img"
        ></img>
      </div>
      <div className="station-info">
        <span className="playlist-word">Playlist</span>
        <h1 className={stationNameClass} onClick={handleEditModalOpen}>
          {station.name}
        </h1>
        {isEditModalOpen && (
          <EditUserStationModal
            onClose={handleEditModalClose}
            station={station}
          />
        )}
        <span className="songs-count"> {station.songs?.length} songs </span>
      </div>
    </>
  )
}
