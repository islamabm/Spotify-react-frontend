import React, { useState } from 'react'
import { DeleteStationModal } from './DeleteStationModal'

export function StationOptionsModal({ position }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  function handleShowDeleteModal() {
    setShowDeleteModal(true)
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false)
  }
  return (
    <>
      <section
        className="station-options-modal"
        style={{
          top: position.top - 30,
          left: position.left,
        }}
      >
        <ul>
          <li>
            <button>Edit details</button>
          </li>
          <li onClick={handleShowDeleteModal}>
            <button>Delete</button>
          </li>
          <li>
            <button>Copy link to playlist</button>
          </li>
          <li>
            <button>About recommendation</button>
          </li>
        </ul>
      </section>
      {showDeleteModal && (
        <DeleteStationModal closeModal={handleCloseDeleteModal} />
      )}
    </>
  )
}
