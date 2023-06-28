import React, { useState } from 'react'
import { DeleteStationModal } from './DeleteStationModal'
import { RecommindationModal } from './RecommindationModal'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeStation } from '../store/actions/station.actions'

export function StationOptionsModal({
  position,
  closeModal,
  openRecommindationModal,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showRecommindationModal, setShowRecommindationModal] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )

  function handleShowDeleteModal() {
    setShowDeleteModal(true)
  }

  function handleShowRecommindationModal() {
    openRecommindationModal()
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

  async function copyLinkToClipboard() {
    const playlistLink = `${window.location.href}`
    try {
      await navigator.clipboard.writeText(playlistLink)
    } catch (err) {
      console.error('Failed to copy playlist link: ', err)
    }
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
          <li onClick={copyLinkToClipboard}>
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
