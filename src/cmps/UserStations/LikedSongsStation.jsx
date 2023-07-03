import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import emptyImg from '../../assets/imgs/empty-img.png'
import { useSelector } from 'react-redux'
import { setCurrStation } from '../../store/actions/station.actions'
export default function LikedSongsStation() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  function goToUserStationDetails() {
    const stationId = '64a31f7a56a7902b69ccef0a'
    dispatch(setCurrStation(stationId))
    navigate(`/station/${stationId}`)
  }

  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  return (
    <section className="user-station-preview" onClick={goToUserStationDetails}>
      <div className="image-svg-container">
        <img
          src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
          alt="station-img"
        />
      </div>
      <div className="user-station-details">
        <div className="user-station-name">
          <p>Liked Songs</p>
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
