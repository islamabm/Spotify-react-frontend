import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getSpotifySvg } from '../services/SVG.service'
import { setCurrSong, setCurrSongIndex } from '../store/actions/song.actions'
import { useParams } from 'react-router-dom'
import { SongOptionsModal } from './SongOptionsModal'

export default function StationSongList(props) {
  const station = props.station
  const dispatch = useDispatch()
  const params = useParams()
  const [hoveredSongIdx] = useState(null)
  const [showModal, setShowOptionsModal] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const [songs, setSongs] = useState(station.songs)
  function onSongClicked(songId) {
    dispatch(setCurrSong(params.id, songId))
    dispatch(setCurrSongIndex(params.id, songId))
  }

  function showSongOptionsModal(e, songId) {
    dispatch(setCurrSong(params.id, songId))

    const rect = e.target.getBoundingClientRect()
    setModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    })
    console.log('showModal', showModal)
    setShowOptionsModal(true)
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

  function handleDragEnd(result) {
    if (!result.destination) {
      return // The item was dropped outside of a droppable area
    }

    const { source, destination } = result

    // Create a new array to avoid mutating the state directly
    const updatedSongs = Array.from(songs)

    // Reorder the songs based on the drag and drop result
    const [movedSong] = updatedSongs.splice(source.index, 1)
    updatedSongs.splice(destination.index, 0, movedSong)

    // Update the state with the new song order
    setSongs(updatedSongs)

    // Dispatch the updateStation action with the new song order
    dispatch(updateStation(params.id, updatedSongs))
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
              onClick={(e) => showSongOptionsModal(e, song._id)}
              className="hidden dots"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('dots'),
              }}
            ></span>
          </div>
        </div>
      ))}
      {showModal && (
        <SongOptionsModal
          position={modalPosition}
          // closeOptionsModal={() => setShowOptionsModal(false)}
        />
      )}
    </div>
  )
}
