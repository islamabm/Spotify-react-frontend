import React, { useState, useRef } from "react"
import { DeleteStationModal } from "./DeleteStationModal"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { removeStation } from "../store/actions/station.actions"

export function StationOptionsModal({
  position,
  closeModal,
  openRecommindationModal,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const modalRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )

  function handleShowDeleteModal() {
    setShowDeleteModal(true)
    // closeModal()
  }

  function handleShowRecommindationModal() {
    openRecommindationModal()
  }
  function handleCloseDeleteModal() {
    setShowDeleteModal(false)
  }

  function handleRemoveStation() {
    console.log("hi")
    dispatch(removeStation(station._id))
    setShowDeleteModal(false)
    navigate(`/`)
  }

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     // if the target of the click is inside the modal, return early
  //     if (modalRef.current && modalRef.current.contains(event.target)) {
  //       return
  //     }
  //     closeModal()
  //   }
  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [closeModal])
  async function copyLinkToClipboard() {
    const playlistLink = `${window.location.href}`
    try {
      await navigator.clipboard.writeText(playlistLink)
    } catch (err) {
      console.error("Failed to copy playlist link: ", err)
    } finally {
      closeModal()
    }
  }

  return (
    <>
      <section
        ref={modalRef}
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
    </>
  )
}
