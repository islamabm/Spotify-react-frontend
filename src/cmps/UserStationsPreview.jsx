import React from 'react'
import { getSpotifySvg } from '../services/SVG.service'
import emptyImg from '../assets/imgs/empty-img.png'
export default function UserStationsPreview({ station }) {
  return (
    <article className="user-station-preview">
      <div className="image-svg-container">
        <span
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('musicIcon'),
          }}
        ></span>
      </div>
      <div className="user-station-details">
        <div className="user-station-name">
          <p>{station.name}</p>
        </div>
        <div className="user-details">
          <span>Playlist</span>
          <span>•</span>
          <span>islam abo mokh</span>
        </div>
      </div>
    </article>
  )
}
