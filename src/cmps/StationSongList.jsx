import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getSpotifySvg } from '../services/SVG.service'
import { setCurrSong, setCurrSongIndex } from '../store/actions/song.actions'
import { useParams } from 'react-router-dom'
import { SongOptionsModal } from './SongOptionsModal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { updateStation } from '../store/actions/station.actions'

export default function StationSongList({ station }) {
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
      return
    }

    const { source, destination } = result

    const updatedSongs = Array.from(songs)

    const [movedSong] = updatedSongs.splice(source.index, 1)
    updatedSongs.splice(destination.index, 0, movedSong)

    setSongs(updatedSongs)

    dispatch(updateStation(params.id, updatedSongs))
  }
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="songList">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {songs?.map((song, idx) => (
              // SONG
              <Draggable key={song._id} draggableId={song._id} index={idx}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="song"
                  >
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
                    <div className="album-name flex align-center">
                      {song.album}
                    </div>
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
                )}
              </Draggable>
              // SONG
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {showModal && (
        <SongOptionsModal
          position={modalPosition}
          // closeOptionsModal={() => setShowOptionsModal(false)}
        />
      )}
    </DragDropContext>
  )
}
