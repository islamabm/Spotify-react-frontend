import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSpotifySvg } from '../services/SVG.service'
import { setCurrSong, setCurrSongIndex } from '../store/actions/song.actions'
import { useParams } from 'react-router-dom'
import { SongOptionsModal } from './SongOptionsModal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { updateStation } from '../store/actions/station.actions'
import { PAUSE_SONG, PLAY_SONG, eventBus } from '../services/event-bus.service'
import { setCurrSongAction } from '../store/actions/song.actions'
import animationGit from '../assets/gif/animation.gif'

export default function StationSongList({ station }) {
  const currSong = useSelector((storeState) => storeState.songModule.currSong)
  const dispatch = useDispatch()
  const params = useParams()
  const [hoveredSongIdx] = useState(null)
  const [hoveredSong, setHoveredSong] = useState(null)
  const [showModal, setShowOptionsModal] = useState(false)
  const [currSvg, setCurrSvg] = useState('play')
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const [songs, setSongs] = useState(station.songs)
  const [clickedSongs, setClickedSongs] = useState({})
  function onSongClicked(songId) {
    if (!clickedSongs[songId]) {
      console.log('first time')
      setCurrSvg('play')
      dispatch(setCurrSong(params.id, songId))
      dispatch(setCurrSongIndex(params.id, songId))

      setClickedSongs((prevState) => ({ ...prevState, [songId]: true }))
    } else {
      console.log('second time')
      setCurrSvg('play')
      eventBus.emit(PLAY_SONG)
    }
  }

  function pauseSong() {
    setCurrSvg('pause')
    eventBus.emit(PAUSE_SONG)
    // console.log('ok')
  }

  useEffect(() => {
    setSongs(station.songs)
  }, [station])

  function showSongOptionsModal(e, song) {
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
                      song?._id !== hoveredSong ? (
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

                      <span
                        onClick={() => {
                          if (isPlayingAndHovered) {
                            pauseSong()
                          } else {
                            onSongClicked(song._id)
                          }
                        }}
                        className={` small-play-btn flex align-center justify-center ${
                          hoveredSongIdx === idx ? 'hovered' : ''
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: getSpotifySvg(
                            isPlayingAndHovered && currSvg === 'play'
                              ? 'smallPauseButton'
                              : 'smallPlayButton'
                          ),
                        }}
                      ></span>
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
          position={modalPosition}
          closeModal={() => setShowOptionsModal(false)}
        />
      )}
    </DragDropContext>
  )
}
