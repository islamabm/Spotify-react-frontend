import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrStation } from '../store/actions/station.actions'
import { setCurrSong, setCurrSongIndex } from '../store/actions/song.actions'
import { userService } from '../services/user.service'
import { updateLatestStations } from '../store/actions/user.actions'
import { getSpotifySvg } from '../services/SVG.service'

export function StationPreview({ station }) {
  const createdBy = station?.createdBy.fullname
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const [isPlaying, setIsPlaying] = useState(false)

  function goToDetails() {
    dispatch(setCurrStation(station._id))
    navigate(`/station/${station._id}`)
    // dispatch(updateLatestStations(station._id, user))
  }

  function playFirstSongInStation(event) {
    event.stopPropagation()
    dispatch(setCurrSong(station?._id, station?.songs[0]._id))
    dispatch(setCurrSongIndex(station?._id, station?.songs[0]._id))
    setIsPlaying(!isPlaying)
  }

  return createdBy === 'system' ? (
    <article className="info" onClick={goToDetails}>
      <div className="station-img">
        <img src={station.imgUrl} alt="station-img" />
        <div
          className="play-button flex justify-center"
          onClick={playFirstSongInStation}
        >
          {isPlaying ? (
            <span
              title="Pause"
              className="pause-button flex align-center justify-center title"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('biggerPauseBtn'),
              }}
            ></span>
          ) : (
            <span
              title="Play"
              className=" flex align-center justify-center title"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('biggerPlayBtn'),
              }}
            ></span>
          )}
        </div>
      </div>
      <div className="station-info flex justify-center">
        <h3>{station.name}</h3>
        <p>{station.description}</p>
      </div>
    </article>
  ) : null
}
