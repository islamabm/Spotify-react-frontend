import React from 'react'
import { Link } from 'react-router-dom'

export function StationPreview({ station, onRemoveStation }) {
  const stationStyle = {
    backgroundImage: `url(https://robohash.org/${station._id})`,
  }
  return (
    <article className="station-preview">
      <Link to={`/station/${station._id}`} className="info">
        <h2>{station.name}</h2>
        {/* <h4>{station.imgUrl}</h4> */}
      </Link>
        <img src={station.imgUrl} alt="" />
      <section className="actions">
        <button onClick={() => onRemoveStation(station._id)}>X</button>
        <Link to={`/station/edit/${station._id}`}>Edit</Link>
      </section>
    </article>
  )
}
