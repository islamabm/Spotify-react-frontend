import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeStation } from '../store/actions/station.actions'
export function DeleteStationModal({ closeModal }) {
  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const dispatch = useDispatch()
  function onRemoveStation() {
    dispatch(removeStation(station._id))
  }

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
