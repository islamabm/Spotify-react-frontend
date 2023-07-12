import React from 'react'

export function EditStationMobilePreview({ song }) {
  return (
    <div className="edit-station-mobile-preview">
      <div className="preview-img-container">
        <img
          className="preview-img"
          src={song.imgUrl}
          alt="station mobile preview"
        />
      </div>
      <div className="name-and-artist">
        <div className="edit-station-mobile-preview-song-name">
          {song?.title}
        </div>
        <div className="edit-station-mobile-preview-song-name">
          {song?.artist}
        </div>
      </div>
    </div>
  )
}
