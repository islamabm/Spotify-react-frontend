import React, { useState } from 'react'
import { getSpotifySvg } from '../services/SVG.service'
import { AddSongModal } from './AddSongModal'
import { useDispatch, useSelector } from 'react-redux'
import { addSongToStation } from '../store/actions/station.actions'
export function SongOptionsModal({ position, closeOptionsModal }) {
  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const song = useSelector((storeState) => storeState.songModule.currSong)
  const [showModal, setShowModal] = useState(false)
  const [modalPosition, setAddModalPosition] = useState({ top: 0, left: 0 })
  const dispatch = useDispatch()
  function showAddModal(e) {
    const rect = e.target.getBoundingClientRect()
    setAddModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    })
    console.log('showModal', showModal)

    setShowModal(true)
  }
  function handleAddSongToStation(stationId) {
    dispatch(addSongToStation(stationId, song))
    setShowModal(false)
  }
  return (
    <>
      <section
        className="song-options-modal"
        style={{
          top: position.top + 20,
          left: position.left - 220,
        }}
      >
        <ul>
          <li>
            <button>Save to your Liked Songs</button>
          </li>
          {station.createdBy.fullname !== 'system' && (
            <li>
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
        />
      )}
    </>
  )
}
