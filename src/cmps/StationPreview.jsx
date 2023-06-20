import React from "react"
import { Link } from "react-router-dom"

export function StationPreview({ station }) {
  return (
    <Link to={`/station/${station._id}`} className="info">
      <article className="station-preview">
        <div className="station-img">
          <img src={station.imgUrl} alt="station-img" />
          <div className="play-button flex justify-center"></div>
        </div>
        <div className="station-info flex justify-center">
          <h3>{station.name}</h3>
          <p>{station.description}</p>
        </div>
      </article>
    </Link>
  )
}
