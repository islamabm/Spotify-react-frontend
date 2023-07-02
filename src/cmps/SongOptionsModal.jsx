import React, { useState, useRef } from 'react'
import { getSpotifySvg } from '../services/SVG.service'
import { AddSongModal } from './AddSongModal'
import { useDispatch, useSelector } from 'react-redux'

import {
  addSongToStation,
  removeSongFromStation,
  addStation,
} from '../store/actions/station.actions'
export function SongOptionsModal({ position, closeModal }) {
  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const song = useSelector((storeState) => storeState.songModule.currSongAction)
  const SongmodalRef = useRef()

  const [showModal, setShowModal] = useState(false)
  const [modalPosition, setAddModalPosition] = useState({ top: 0, left: 0 })
  const dispatch = useDispatch()

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
    closeModal()
  }

  function handleRemoveSongFromStation() {
    dispatch(removeSongFromStation(station._id, song?._id))
    closeModal()
  }

  return (
    <>
      <section
        ref={SongmodalRef}
        className="song-options-modal"
        style={{
          top: position.top + 20,
          left: position.left - 220,
        }}
      >
        <ul>
          <li onClick={addSongToLikedSongs}>
            <button>Save to your Liked Songs</button>
          </li>
          {station.createdBy.fullname !== 'system' && (
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
