import React, { useState } from 'react'
import { getSpotifySvg } from '../services/SVG.service'
import { AddSongModal } from './AddSongModal'
export function SongOptionsModal({ position, closeOptionsModal }) {
  const [showModal, setShowModal] = useState(false)
  const [modalPosition, setAddModalPosition] = useState({ top: 0, left: 0 })
  function showAddModal(e) {
    const rect = e.target.getBoundingClientRect()
    setAddModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    })
    console.log('showModal', showModal)

    setShowModal(true)
  }

  function closeModal() {
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
          <li>
            <button>Remove from this playlist</button>
          </li>
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
        <AddSongModal position={modalPosition} closeModal={closeModal} />
      )}
    </>
  )
}
