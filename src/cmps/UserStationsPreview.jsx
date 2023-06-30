import React from 'react'
import { getSpotifySvg } from '../services/SVG.service'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import emptyImg from '../assets/imgs/empty-img.png'
import { useSelector } from 'react-redux'
import {
  setCurrGradient,
  setCurrStation,
} from '../store/actions/station.actions'
export default function UserStationsPreview({ station }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  function goToUserStationDetails() {
    dispatch(setCurrStation(station._id))
    navigate(`/station/${station._id}`)
  }

  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  return (
    <section className="user-station-preview" onClick={goToUserStationDetails}>
      <div className="image-svg-container">
        {/* <span
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('musicIcon'),
          }}
        ></span> */}
        <img src={station.imgUrl ? station.imgUrl : emptyImg} />
      </div>
      <div className="user-station-details">
        <div className="user-station-name">
          <p>{station?.name}</p>
        </div>
        <div className="user-details">
          <span>Playlist</span>
          <span>•</span>
          <span>{user?.username}</span>
        </div>
      </div>
    </section>
  )
}
