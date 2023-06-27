import React, { useState } from 'react'
import { DeleteStationModal } from './DeleteStationModal'
import { useDispatch, useSelector } from 'react-redux'
import { removeStation } from '../store/actions/station.actions'
export function StationOptionsModal({ position }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const dispatch = useDispatch()

  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )

  function handleShowDeleteModal() {
    setShowDeleteModal(true)
  }

  function handleCloseDeleteModal() {
    setShowDeleteModal(false)
  }

  function handleRemoveStation() {
    dispatch(removeStation(station._id))
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
        <DeleteStationModal
          closeModal={handleCloseDeleteModal}
          onRemoveStation={handleRemoveStation}
        />
      )}
    </>
  )
}
