import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrStation } from '../../store/actions/station.actions'
import { getSpotifySvg } from '../../services/SVG.service'

export function UserLibraryPreview({ station }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  function goToDetails() {
    dispatch(setCurrStation(station._id))
    navigate(`/station/${station._id}`)
  }

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
        <div className="play-button flex justify-center">
          {isPlaying ? (
            <span
              className="pause-button flex align-center justify-center title"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('biggerPauseBtn'),
              }}
            ></span>
          ) : (
            <span
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
