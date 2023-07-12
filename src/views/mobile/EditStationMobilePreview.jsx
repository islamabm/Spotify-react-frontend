import React from 'react'
import { getSpotifySvg } from '../../services/SVG.service'
export function EditStationMobilePreview({ song }) {
  return (
    <div className="edit-station-mobile-preview">
      <div className="preview-img-container">
        <span
          // onClick={goToPreviousRoute}
          title="Go back"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('deleteMobile'),
          }}
        ></span>
        <div className="name-and-artist">
          <p className="edit-station-mobile-preview-song-name">{song?.title}</p>
          <p className="edit-station-mobile-preview-song-name">
            {song?.artist}
          </p>
        </div>
      </div>
      <span
        // onClick={goToPreviousRoute}
        title="Go back"
        dangerouslySetInnerHTML={{
          __html: getSpotifySvg('menu'),
        }}
      ></span>
    </div>
  )
}
