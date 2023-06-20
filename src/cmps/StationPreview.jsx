import React from 'react'
import { Link } from 'react-router-dom'

export function StationPreview({ station, onRemoveStation }) {
  const stationStyle = {
    backgroundImage: `url(https://robohash.org/${station._id})`,
  }
  return (
    <article className="station-preview">
      <Link to={`/station/${station._id}`} className="info">
        <h2>{station.model}</h2>
        <h4>{station.type}</h4>
      </Link>
      <section className="actions">
        <button onClick={() => onRemoveStation(station._id)}>X</button>
        <Link to={`/station/edit/${station._id}`}>Edit</Link>
      </section>
    </article>
  )
}
