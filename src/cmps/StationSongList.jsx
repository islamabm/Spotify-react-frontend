import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSpotifySvg } from '../services/SVG.service'
import {
  setCurrSong,
  setCurrSongIndex,
  setCurrSongSvg,
} from '../store/actions/song.actions'
import { useParams } from 'react-router-dom'
import { SongOptionsModal } from './Modals/SongOptionsModal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { updateStation } from '../store/actions/station.actions'
import { PAUSE_SONG, eventBus } from '../services/event-bus.service'
import { setCurrSongAction } from '../store/actions/song.actions'
import animationGit from '../assets/gif/animation.gif'

export default function StationSongList({ station }) {
  const currSong = useSelector((storeState) => storeState.songModule.currSong)
  const dispatch = useDispatch()
  const params = useParams()
  const [hoveredSongIdx] = useState(null)
  const [hoveredSong, setHoveredSong] = useState(null)
  const [currSvg, setCurrSvg] = useState('play')
  const [showModal, setShowOptionsModal] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const [songs, setSongs] = useState(station.songs)
  const [isFirstClick, setIsFirstClick] = useState(true)
  function onSongClicked(songId) {
    setCurrSvg('play')

    if (currSong?.id !== songId) {
      setIsFirstClick(true)
    }

    if (isFirstClick) {
      console.log('hi first time')
      dispatch(setCurrSong(params.id, songId))
      dispatch(setCurrSongIndex(params.id, songId))
      setIsFirstClick(false)
    } else {
      console.log('hi after first time')
      dispatch(setCurrSongSvg('play'))
    }
  }

  function pauseSong() {
    setCurrSvg('pause')

    dispatch(setCurrSongSvg('pause'))
  }

  useEffect(() => {
    setSongs(station.songs)
  }, [station])

  function showSongOptionsModal(e, song) {
    console.log('song in dots', song)
    dispatch(setCurrSongAction(station._id, song._id))
    e.stopPropagation()

    const rect = e.target.getBoundingClientRect()
    setModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    })
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

    const [movedSong] = updatedSongs?.splice(source.index, 1)
    updatedSongs.splice(destination.index, 0, movedSong)

    setSongs(updatedSongs)

    dispatch(updateStation(params.id, updatedSongs))
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="songList">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {songs?.map((song, idx) => {
              const isPlayingAndHovered =
                song?._id === currSong?._id && song?._id === hoveredSong

              return (
                <Draggable
                  key={idx}
                  draggableId={song?._id || `song-${idx}`}
                  index={idx}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="song"
                      onMouseEnter={() => setHoveredSong(song._id)}
                      onMouseLeave={() => setHoveredSong(null)}
                    >
                      {song?._id === currSong?._id &&
                      song?._id !== hoveredSong &&
                      currSvg === 'play' ? (
                        <img
                          className="song-animation-gif"
                          src={animationGit}
                          alt="Animation"
                        />
                      ) : (
                        <span
                          className={`song-idx flex align-center justify-center ${
                            hoveredSongIdx === idx ? 'hovered' : ''
                          }`}
                          style={{
                            color: song?._id === currSong?._id ? '#1ED760' : '',
                          }}
                        >
                          {idx + 1}
                        </span>
                      )}

                      {isPlayingAndHovered && currSvg === 'play' ? (
                        <span
                          onClick={pauseSong}
                          className={` small-play-btn flex align-center justify-center ${
                            hoveredSongIdx === idx ? 'hovered' : ''
                          }`}
                          dangerouslySetInnerHTML={{
                            __html: getSpotifySvg('smallPauseButton'),
                          }}
                        ></span>
                      ) : (
                        <span
                          onClick={() => onSongClicked(song._id)}
                          className={` small-play-btn flex align-center justify-center ${
                            hoveredSongIdx === idx ? 'hovered' : ''
                          }`}
                          dangerouslySetInnerHTML={{
                            __html: getSpotifySvg('smallPlayButton'),
                          }}
                        ></span>
                      )}
                      <div className="song-details-container">
                        <div className="img-container flex align-center justify-center">
                          <img
                            className="song-img"
                            src={song?.imgUrl}
                            alt="song img"
                          />
                        </div>
                        <div className="name-and-artist flex justify-center">
                          <span
                            className="song-name"
                            style={{
                              color:
                                song?._id === currSong?._id ? '#1ED760' : '',
                            }}
                          >
                            {song?.title}
                          </span>
                          <span className="song-artist">{song?.artist}</span>
                        </div>
                      </div>
                      <div className="album-name flex align-center">
                        {song?.album}
                      </div>
                      <div className="added-at flex align-center">
                        {formatDate(song?.addedAt)}
                      </div>
                      <div className="duration-container flex">
                        <span
                          className="hidden dots"
                          dangerouslySetInnerHTML={{
                            __html: getSpotifySvg('emptyHeartIcon'),
                          }}
                        ></span>
                        <div className="duration">
                          {song?.duration ? song?.duration : '1:00'}
                        </div>
                        <span
                          onClick={(e) => showSongOptionsModal(e, song)}
                          className="hidden dots"
                          dangerouslySetInnerHTML={{
                            __html: getSpotifySvg('dots'),
                          }}
                        ></span>
                      </div>
                    </div>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {showModal && (
        <SongOptionsModal
          station={station}
          position={modalPosition}
          closeModal={() => setShowOptionsModal(false)}
        />
      )}
    </DragDropContext>
  )
}
