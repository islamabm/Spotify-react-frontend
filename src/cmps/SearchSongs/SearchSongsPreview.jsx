import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addSongToStation } from '../../store/actions/station.actions'
import { utilService } from '../../services/util.service'
import {
  setCurrDirection,
  setCurrSongAction,
  setVideoId,
} from '../../store/actions/song.actions'
import { getSpotifySvg } from '../../services/SVG.service'
import { SongOptionsModal } from '../Modals/SongOptionsModal'

export function SearchSongsPreview({ song, stationId }) {
  const [showModal, setShowOptionsModal] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })

  const dispatch = useDispatch()

  function playSong() {
    dispatch(setVideoId(song.videoId, song))
  }

  function handleAddSong() {
    song._id = utilService.makeId()
    dispatch(addSongToStation(stationId, song))
  }

  function showSongOptionsModal(e, song) {
    dispatch(setCurrSongAction(stationId, song._id))
    dispatch(setCurrDirection('left'))
    e.stopPropagation()

    const rect = e.target.getBoundingClientRect()
    setModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    })
    setShowOptionsModal((prevState) => !prevState)
  }

  return (
    <article className="recommended-song flex align-center">
      <div className="img-and-title flex align-center" onClick={playSong}>
        <img src={song.imgUrl} className="song-img" />
        <div className="name-and-artist-container flex justify-center">
          <span className="song-name pointer">{song?.title}</span>
          <span className="song-artist">{song?.artist}</span>
        </div>
      </div>
      {stationId ? (
        <button onClick={handleAddSong} className="pointer">
          Add
        </button>
      ) : (
        <span
          className="mobile-dots"
          onClick={(e) => showSongOptionsModal(e, song)}
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('mobileDots'),
          }}
        ></span>
      )}
      {showModal && (
        <SongOptionsModal
          position={modalPosition}
          closeModal={() => setShowOptionsModal(false)}
        />
      )}
    </article>
  )
}
