import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'
import { setCurrStation } from '../../store/actions/station.actions'
import { getSpotifySvg } from '../../services/SVG.service'

export default function LikedSongsStation() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function goToUserStationDetails() {
    const stationId = '6466c0bf5aa2c46190c54046'
    dispatch(setCurrStation(stationId))
    navigate(`/station/${stationId}`)
  }

  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  if (user && user.LikedSongs && user.LikedSongs.length !== 0) {
    return (
      <section
        className="user-station-preview"
        onClick={goToUserStationDetails}
      >
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
            <span
              className="pinned-svg"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('pinnedIcon'),
              }}
            ></span>
            <span>Playlist</span>
            <span>•</span>
            <span>
              {user?.LikedSongs?.length}{' '}
              {user?.LikedSongs?.length === 1 ? 'song' : 'songs'}
            </span>
          </div>
        </div>
      </section>
    )
  }
}
