import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrStation } from '../../store/actions/station.actions'
import { setCurrSong, setCurrSongIndex } from '../../store/actions/song.actions'
import { getSpotifySvg } from '../../services/SVG.service'

export default function LatestStationsPreview({ station }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isPlaying, setIsPlaying] = useState(false)
  function goToDetails() {
    dispatch(setCurrStation(station._id))
    navigate(`/station/${station._id}`)
  }

  function playFirstSongInStation(event) {
    event.stopPropagation()
    dispatch(setCurrSong(station?._id, station?.songs[0]._id))
    dispatch(setCurrSongIndex(station?._id, station?.songs[0]._id))
    setIsPlaying(!isPlaying)
  }

  return (
    station && (
      <article
        onClick={goToDetails}
        className="latest-stations-article pointer"
      >
        <img src={station.imgUrl} />
        <span>{station.name}</span>
        <div
          className="play-button flex justify-center"
          onClick={playFirstSongInStation}
        >
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
      </article>
    )
  )
}
