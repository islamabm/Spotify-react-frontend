import React from 'react'
import { Link } from 'react-router-dom'

export function StationPreview({ station, onRemoveStation }) {
  const stationStyle = {
    backgroundImage: `url(https://robohash.org/${station._id})`,
  }
  return (
    <article className="station-preview">
      <Link to={`/station/${station._id}`} className="info">
        <img className='station-img' src={station.imgUrl} alt="" />
        <h2>{station.name}</h2>
      </Link>
    </article>
  )
}
