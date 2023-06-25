import React from 'react'
import { useNavigate } from 'react-router-dom'

export function StationPreview({ station }) {
  const createdBy = station.createdBy.fullname
  const navigate = useNavigate()

  function goToDetails() {
    navigate(`/station/${station._id}`)
  }

  return (
    createdBy === 'system' && (
      <article className="info" onClick={goToDetails}>
        <div className="station-img">
          <img src={station.imgUrl} alt="station-img" />
          <div className="play-button flex justify-center"></div>
        </div>
        <div className="station-info flex justify-center">
          <h3>{station.name}</h3>
          <p>{station.description}</p>
        </div>
      </article>
    )
  )
}
