import React, { useState } from 'react'
import { DeleteStationModal } from './DeleteStationModal'
import { RecommindationModal } from './RecommindationModal'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeStation } from '../store/actions/station.actions'
export function StationOptionsModal({ position, closeModal }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showRecommindationModal, setShowRecommindationModal] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )

  function handleShowDeleteModal() {
    setShowDeleteModal(true)
  }

  function handleShowRecommindationModal() {
    closeModal()
    setTimeout(() => {
      setShowRecommindationModal(true)
    }, 0)
  }
  function handleCloseDeleteModal() {
    setShowDeleteModal(false)
  }

  function handleCloseRecommindationModal() {
    setShowRecommindationModal(false)
  }

  function handleRemoveStation() {
    dispatch(removeStation(station._id))
    setShowDeleteModal(false)
    navigate(`/`)
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
            <button onClick={handleShowRecommindationModal}>
              About recommendation
            </button>
          </li>
        </ul>
      </section>
      {showDeleteModal && (
        <DeleteStationModal
          closeModal={handleCloseDeleteModal}
          onRemoveStation={handleRemoveStation}
        />
      )}

      {showRecommindationModal && (
        <RecommindationModal
          closeRecommindationModal={handleCloseRecommindationModal}
        />
      )}
    </>
  )
}
