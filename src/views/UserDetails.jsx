import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export function UserDetails() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  const dispatch = useDispatch()

  function handleFile(e) {
    // Handle file upload here...
    console.log('e', e)
  }

  return user ? (
    <section className="user-profile">
      <div className="user-details-container">
        <label
          className="cover-img"
          onDrop={(e) => {
            e.preventDefault()
            handleFile(e)
          }}
          onDragOver={(e) => {
            e.preventDefault()
          }}
        >
          <img
            className="user-profile-img"
            style={{ maxWidth: '200px' }}
            src={
              user.imgUrl
                ? user.imgUrl
                : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg'
            }
          />
          <input
            type="file"
            onChange={handleFile}
            style={{ display: 'none' }}
          />
        </label>
        <div className="user-info">
          <span className="profile-word"> Profile </span>
          <h3 className="user-username">{user?.username}</h3>
          <span className="user-stations-count">24 Public Playlists</span>
          <span className="dot">•</span>
          <span className="following">7 following</span>
        </div>
      </div>
    </section>
  ) : null
}
