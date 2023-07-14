import React, { useState, useRef, useEffect } from 'react'
import { getSpotifySvg } from '../../services/SVG.service'
import { AddSongModal } from './AddSongModal'
import { useDispatch, useSelector } from 'react-redux'
import {
  addSongToStation,
  removeSongFromStation,
  addStation,
} from '../../store/actions/station.actions'
import {
  updateUser,
  removeSongFromUser,
} from '../../store/actions/user.actions'

export function SongOptionsModal({ position, closeModal, station }) {
  const [createdBy, setCreatedBy] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalPosition, setAddModalPosition] = useState({ top: 0, left: 0 })

  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const song = useSelector((storeState) => storeState.songModule.currSongAction)

  const SongmodalRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    setCreatedBy(station?.createdBy?.fullname)
  }, [station])

  function showAddModal(e) {
    const rect = e.target.getBoundingClientRect()
    setAddModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    })

    setShowModal(true)
  }

  function handleAddSongToStation(stationId) {
    dispatch(addSongToStation(stationId, song))
    setShowModal(false)
    closeModal()
  }

  function handleCreateStation() {
    const name = song?.title

    if (!song) {
      console.error('No song selected')
      return
    }

    dispatch(addStation(name, [song], song?.imgUrl))
    setShowModal(false)
    closeModal()
  }

  function addSongToLikedSongs() {
    dispatch(updateUser(song, user))
    closeModal()
  }

  function removeSongFromLikedSongs() {
    dispatch(removeSongFromUser(song._id, user))
  }

  function handleRemoveSongFromStation() {
    dispatch(removeSongFromStation(station?._id, song._id))
    closeModal()
  }

  return (
    <>
      <section
        ref={SongmodalRef}
        className="song-options-modal"
        style={{
          top: position.top + 20,
          left: position.left - 170,
        }}
      >
        <ul>
          {createdBy === 'Liked songs system' ? (
            <li onClick={removeSongFromLikedSongs}>
              <button>Remove from your Liked Songs</button>
            </li>
          ) : (
            <li onClick={addSongToLikedSongs}>
              <button>Save to your Liked Songs</button>
            </li>
          )}
          {station?.createdBy.fullname !== 'system' && (
            <li onClick={handleRemoveSongFromStation}>
              <button>Remove from this playlist</button>
            </li>
          )}
          <li className="special-li">
            <button onClick={showAddModal}>Add to playlist</button>
            <span
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('listIcon'),
              }}
            ></span>
          </li>
        </ul>
      </section>
      {showModal && (
        <AddSongModal
          position={modalPosition}
          addSongToStation={handleAddSongToStation}
          createStation={handleCreateStation}
        />
      )}
    </>
  )
}
