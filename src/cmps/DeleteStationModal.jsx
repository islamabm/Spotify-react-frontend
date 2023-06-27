import React from 'react'
import { useSelector } from 'react-redux'

export function DeleteStationModal({ closeModal, onRemoveStation }) {
  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )

  return (
    <section className="delete-modal-backdrop">
      <div className="delete-modal">
        <h1>Delete from Library?</h1>
        <p>
          This will delete <span>{station.name} </span> from Your Library.
        </p>
        <div className="delete-modla-btns">
          <button className="delete-modal-cancle-btn" onClick={closeModal}>
            Cancel
          </button>
          <button className="delete-modal-delete-btn" onClick={onRemoveStation}>
            Delete
          </button>
        </div>
      </div>
    </section>
  )
}
