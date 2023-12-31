import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSpotifySvg } from '../services/SVG.service'
import { BubblingHeart } from './BubblingHeart'
import {
  setCurrSong,
  setCurrSongIndex,
  setCurrSongSvg,
  setCurrDirection,
} from '../store/actions/song.actions'
import { useNavigate, useParams } from 'react-router-dom'
import { SongOptionsModal } from './Modals/SongOptionsModal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { updateStation } from '../store/actions/station.actions'
import {
  setCurrSongAction,
  setCurrSongLyrics,
} from '../store/actions/song.actions'
import animationGit from '../assets/gif/animation.gif'

export default function StationSongList({ station }) {
  const [hoveredSongIdx] = useState(null)
  const [hoveredSong, setHoveredSong] = useState(null)
  const [createdBy, setCreatedBy] = useState('')
  const [currSvg, setCurrSvg] = useState('play')
  const [showModal, setShowOptionsModal] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const [songs, setSongs] = useState(station.songs)
  const [isFirstClick, setIsFirstClick] = useState(true)

  const currSong = useSelector((storeState) => storeState.songModule.currSong)
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setSongs(station.songs)
  }, [station])

  useEffect(() => {
    setCreatedBy(station.createdBy?.fullname)
  }, [station])

  function onSongClicked(songId) {
    setCurrSvg('play')
    if (currSong?.id !== songId) {
      setIsFirstClick(true)
    }
    if (isFirstClick) {
      dispatch(setCurrSong(params.id, songId))
      dispatch(setCurrSongIndex(params.id, songId))
      setIsFirstClick(false)
    } else {
      dispatch(setCurrSongSvg('play'))
    }
  }

  function pauseSong() {
    setCurrSvg('pause')
    dispatch(setCurrSongSvg('pause'))
  }

  function showSongOptionsModal(e, song) {
    dispatch(setCurrSongAction(station._id, song._id))
    dispatch(setCurrDirection('left'))
    e.stopPropagation()

    const rect = e.target.getBoundingClientRect()
    setModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    })
    setShowOptionsModal((prevState) => !prevState)
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
    if (!result.destination) return
    const { source, destination } = result
    const updatedSongs = Array.from(songs)
    const [movedSong] = updatedSongs?.splice(source.index, 1)
    updatedSongs.splice(destination.index, 0, movedSong)
    setSongs(updatedSongs)
    dispatch(updateStation(params.id, updatedSongs))
  }

  function onLyricsClicked(artist, title, songId) {
    dispatch(setCurrSongAction(station._id, songId))
    dispatch(setCurrSongLyrics(artist, title))
    navigate('/lyrics')
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="songList">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="song-list"
          >
            {(createdBy === 'Liked songs system'
              ? user?.LikedSongs
              : songs
            )?.map((song, idx) => {
              const isPlayingAndHovered =
                song?._id === currSong?._id && song?._id === hoveredSong

              return (
                <Draggable key={idx} draggableId={`song-${idx}`} index={idx}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="song"
                      onMouseEnter={() => setHoveredSong(song?._id)}
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
                          className={` small-play-btn flex align-center justify-center title ${
                            hoveredSongIdx === idx ? 'hovered' : ''
                          }`}
                          dangerouslySetInnerHTML={{
                            __html: getSpotifySvg('smallPauseButton'),
                          }}
                        ></span>
                      ) : (
                        <span
                          onClick={() => onSongClicked(song._id)}
                          className={` small-play-btn flex align-center justify-center title play${
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
                            onClick={() =>
                              onLyricsClicked(song.artist, song.title, song._id)
                            }
                            className="song-name pointer"
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
                        <span>
                          <BubblingHeart index={idx} item={song} type="song" />
                        </span>

                        <div className="duration">
                          {song?.duration ? song?.duration : '1:00'}
                        </div>
                        <span
                          onClick={(e) => showSongOptionsModal(e, song)}
                          className="dots title song-option"
                          dangerouslySetInnerHTML={{
                            __html:
                              window.innerWidth > 460
                                ? getSpotifySvg('dots')
                                : getSpotifySvg('mobileDots'),
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
