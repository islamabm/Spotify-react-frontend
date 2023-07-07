import React, { useEffect } from 'react'
import { getSpotifySvg } from '../../services/SVG.service'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import emptyImg from '../../assets/imgs/empty-img.png'
import { useSelector } from 'react-redux'
import { setCurrStation } from '../../store/actions/station.actions'
export default function UserStationsPreview({ station, color }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  function goToUserStationDetails() {
    dispatch(setCurrStation(station._id))
    navigate(`/station/${station._id}`)
  }

  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  // const song = useSelector((storeState) => storeState.songModule.currSong)
  // const currentPlaylist = useSelector(
  //   (storeState) => storeState.stationModule.currStation
  // )
  // console.log('song', song)
  // console.log('currentPlaylist', currentPlaylist)

  // const isSongInPlaylist =
  //   currentPlaylist.songs.some((s) => s._id === song?._id)

  return (
    <section className="user-station-preview" onClick={goToUserStationDetails}>
      <div className="image-svg-container">
        <img
          src={station.imgUrl ? station.imgUrl : emptyImg}
          alt="station-img"
        />
      </div>
      <div className="user-station-details">
        <div className="user-station-name">
          <p className={color}>{station?.name}</p>
        </div>
        <div className="user-details">
          <span>Playlist</span>
          <span>•</span>
          <span>{user?.username}</span>
        </div>
      </div>

      {color === 'green' && (
        <span
          className="user-library-volume"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('volumeIconStation'),
          }}
        ></span>
      )}
    </section>
  )
}
