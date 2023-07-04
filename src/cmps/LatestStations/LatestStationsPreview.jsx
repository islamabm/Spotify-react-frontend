import React from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { setCurrStation } from '../../store/actions/station.actions'

export default function LatestStationsPreview({ station }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  function goToDetails() {
    dispatch(setCurrStation(station._id))
    navigate(`/station/${station._id}`)
  }

  return (
    station && (
        <article onClick={goToDetails} className="latest-stations-article pointer">
          <img src={station.imgUrl} />
          <span>{station.name}</span>
          <div className="play-button flex justify-center align-center"></div>
          </article>
    )
  );
}
