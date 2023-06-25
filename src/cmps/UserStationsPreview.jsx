import React from 'react'
import emptyImg from '../assets/imgs/empty-img.png'
export default function UserStationsPreview({ station }) {
  return (
    <article className="user-station-preview">
      <img src={emptyImg} />
      <div>
        <p>{station.name}</p>
        <span className="dot">•</span>
        <span>Guest</span>
      </div>
    </article>
  )
}
