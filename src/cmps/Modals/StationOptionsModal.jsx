import React, { useRef } from 'react'

export function StationOptionsModal({
  position,
  closeOptionsModal,
  openRecommindationModal,
  onShowDeleteModal,
}) {
  const modalRef = useRef()

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
