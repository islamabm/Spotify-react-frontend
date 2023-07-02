import React from 'react'

export function UserModal({ onClose }) {
  return (
    <div className="user-modal">
      <div className="user-actions-modal pointer" onClick={onClose}>
        <p>Profile</p>
      </div>
      <div className="line"></div>
      <div className="user-actions-modal pointer" onClick={onClose}>
        <p>Log out</p>
      </div>
    </div>
  )
}
