import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrStation } from '../store/actions/station.actions'
export function StationPreview({ station }) {
  const createdBy = station?.createdBy.fullname
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function goToDetails() {
    // dispatch(setCurrStation(station._id))
    navigate(`/station/${station._id}`)
    console.log('hi sfter go')
  }

  return (
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
}
