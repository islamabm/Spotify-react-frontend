import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { uploadImg } from '../services/upload.service'
import { editUserImg } from '../store/actions/user.actions'
export function UserDetails() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const [isUploading, setIsUploading] = useState(false)
  const dispatch = useDispatch()

  async function handleFile(ev) {
    const file =
      ev.type === 'change' ? ev.target.files[0] : ev.dataTransfer.files[0]
    try {
      setIsUploading(true)
      const { url } = await uploadImg(file)
      dispatch(editUserImg(url, user))
    } catch (err) {
      console.log('err', err)
    } finally {
      setIsUploading(false)
    }
  }

  return user ? (
    <section className="user-profile">
      <div className="user-details-container">
        <label
          className="cover-img"
          onDrop={(ev) => {
            ev.preventDefault()
            handleFile(ev)
          }}
          onDragOver={(ev) => {
            ev.preventDefault()
          }}
        >
          {isUploading ? (
            <span className="loader"></span>
          ) : (
            <img
              className="user-profile-img"
              style={{ maxWidth: '200px' }}
              src={
                user.imgUrl
                  ? user.imgUrl
                  : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg'
              }
              alt="user-img"
            />
          )}

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
          <span className="dot"> • </span>
          <span className="following">7 following</span>
        </div>
      </div>
    </section>
  ) : null
}
