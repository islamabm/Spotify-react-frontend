import React, {useState} from 'react'
import { stationService } from '../services/station.service.js'
import { getSpotifySvg } from '../services/SVG.service.js'
import {EditUserStationModal} from '../cmps/EditUserStationModal'

export default function StationUser({ station }) {
  const stationNameClass = stationService.stationNameClass(station)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };
  return (
    <>
      <div className="station-main-img user-main-img justify-center align-center">
        <span
          className="music-note"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('userStationImg'),
          }}
        ></span>
        <img
          className="default-image station-cover-img"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAAEZCAYAAAA39vjlAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAOPSURBVHhe7dQxAcAwDMCwdGjCn+D6DMP8SI8Z+OzuOwCB5yvA7wwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIyBgRkDAjIGBCQMSAgY0BAxoCAjAEBGQMCMgYEZAwIyBgQkDEgIGNAQMaAgIwBARkDAjIGBGQMCMgYEJAxICBjQEDGgICMAQEZAwIiMxfDDQOpTuTtfAAAAABJRU5ErkJggg=="
          alt="user station img"
        ></img>
      </div>
      <div className="station-info">
        <span className="playlist-word">Playlist</span>
        <h1 className={stationNameClass} onClick={handleEditModalOpen}>{station.name}</h1>
        {isEditModalOpen && (
        <EditUserStationModal onClose={handleEditModalClose} station={station} />
      )}
        <span className="songs-count"> {station.songs?.length} songs </span>
      </div>
    </>
  )
}
