import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

export function StationOptionsModal({
  position,
  closeOptionsModal,
  openRecommindationModal,
  onShowDeleteModal,
}) {
  const modalRef = useRef()
  const navigate = useNavigate()
  function handleShowDeleteModal() {
    onShowDeleteModal()
    closeOptionsModal()
  }

  function handleShowRecommindationModal() {
    openRecommindationModal()
  }

  async function copyLinkToClipboard() {
    const playlistLink = `${window.location.href}`
    try {
      await navigator.clipboard.writeText(playlistLink)
    } catch (err) {
      console.error('Failed to copy playlist link: ', err)
    } finally {
      closeOptionsModal()
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeOptionsModal()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [modalRef, closeOptionsModal])

  function goToEdit() {
    navigate('/edit/mobile')
  }

  return (
    <>
      <section
        ref={modalRef}
        className="station-options-modal"
        style={{
          top: position.top + 40,
          left: position.left,
        }}
      >
        <ul>
          {window.innerWidth < 460 && (
            <li>
              <button onClick={goToEdit}>Edit details</button>
            </li>
          )}
          <li onClick={(e) => handleShowDeleteModal(e)}>
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
    </>
  )
}
