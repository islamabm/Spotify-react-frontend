import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrStation } from '../../store/actions/station.actions'
import { setCurrSong, setCurrSongIndex } from '../../store/actions/song.actions'

import { getSpotifySvg } from '../../services/SVG.service'

export function UserLibraryPreview({ station }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isPlaying, setIsPlaying] = useState(false)

  function goToDetails() {
    dispatch(setCurrStation(station._id))
    navigate(`/station/${station._id}`)
  }

  // function playFirstSongInStation(event) {
  //   event.stopPropagation()
  //   dispatch(setCurrSong(station?._id, station?.songs[0]._id))
  //   dispatch(setCurrSongIndex(station?._id, station?.songs[0]._id))
  //   setIsPlaying(!isPlaying)
  // }

  return (
    <article className="info-user" onClick={goToDetails}>
      <div className="station-img">
        <img
          src={
            station.imgUrl
              ? station.imgUrl
              : 'https://pbs.twimg.com/profile_images/558556141605511168/2JDJX8SQ_400x400.png'
          }
        />
        <div
          className="play-button flex justify-center"
          // onClick={playFirstSongInStation}
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
        <h3>{station?.name}</h3>
      </div>
      <p>{station?.description}</p>
    </article>
  )
}
