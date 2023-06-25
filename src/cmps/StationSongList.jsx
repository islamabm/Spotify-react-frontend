import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getSpotifySvg } from '../services/SVG.service'
import { setCurrSong, setCurrSongIndex } from '../store/actions/song.actions'
import { useParams } from 'react-router-dom'
import { SongOptionsModal } from './SongOptionsModal'

export default function StationSongList(props) {
  const [showModal, setShowModal] = useState(false)

  const station = props.station
  const dispatch = useDispatch()
  const params = useParams()
  const [hoveredSongIdx] = useState(null)
  function onSongClicked(songId) {
    dispatch(setCurrSong(params.id, songId))
    dispatch(setCurrSongIndex(params.id, songId))
  }

  function showSongOptionsModal() {
    console.log('showModal', showModal)
    setShowModal(true)
  }

  function formatDate(dateString) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    const date = new Date(dateString)
    const monthIndex = date.getMonth()
    const day = date.getDate()
    const year = date.getFullYear()

    const formattedDate = `${months[monthIndex]} ${day}, ${year}`
    return formattedDate
  }

  return (
    <div>
      {station.songs.map((song, idx) => (
        <div key={idx} className="song">
          <span
            className={`song-idx flex align-center justify-center ${
              hoveredSongIdx === idx ? 'hovered' : ''
            }`}
          >
            {idx + 1}
          </span>
          <span
            className={` small-play-btn flex align-center justify-center ${
              hoveredSongIdx === idx ? 'hovered' : ''
            }`}
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('smallPlayButton'),
            }}
          ></span>
          <div className="song-details-container">
            <div className="img-container flex align-center justify-center">
              <img
                onClick={() => onSongClicked(song._id)}
                className="song-img"
                src={song.imgUrl}
                alt="song img"
              />
            </div>
            <div className="name-and-artist flex justify-center">
              <span className="song-name">{song.title}</span>
              <span className="song-artist">{song.artist}</span>
            </div>
          </div>
          <div className="album-name flex align-center">{song.album}</div>
          <div className="added-at flex align-center">
            {formatDate(song.addedAt)}
          </div>
          <div className="duration-container flex">
            <span
              className="hidden dots"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('emptyHeartIcon'),
              }}
            ></span>
            <div className="duration">
              {song.duration ? song.duration : '1:00'}
            </div>
            <span
              onClick={showSongOptionsModal}
              className="hidden dots"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('dots'),
              }}
            ></span>
          </div>
        </div>
      ))}
      {showModal && <SongOptionsModal />}
    </div>
  )
}
