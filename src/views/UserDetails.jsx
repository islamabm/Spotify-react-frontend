import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { uploadImg } from '../services/upload.service'
import { editUserImg } from '../store/actions/user.actions'
import { FastAverageColor } from 'fast-average-color'

export function UserDetails() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const [isUploading, setIsUploading] = useState(false)
  const [bgStyle, setBgStyle] = useState(null)
  const dispatch = useDispatch()
  const colorCache = {}
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

  useEffect(() => {
    updateImgUrlAndColor(user.imgUrl)
  }, [user?.imgUrl])

console.log('user', user)
  function updateImgUrlAndColor(userImg) {
    if (!user.imgUrl) return
      getDominantColor(userImg)
  }

  async function getDominantColor(imageSrc) {
    const cachedColor = colorCache[imageSrc]
    if (cachedColor) {
      const gradient = `linear-gradient(to bottom, ${cachedColor} 0%, ${cachedColor} 80vh, black 80vh, black 100%)`;
      console.log('there is cached');
      setBgStyle(gradient)

      document.body.style.backgroundImage = gradient
      return
    }
    const fac = new FastAverageColor()
    const img = new Image()
    console.log('Api call');
    img.crossOrigin = 'Anonymous'
    const corsProxyUrl = 'https://api.codetabs.com/v1/proxy?quest='
    img.src = corsProxyUrl + encodeURIComponent(imageSrc)
    img.onload = async () => {
      try {
        const color = await fac.getColorAsync(img)
        colorCache[imageSrc] = color
        setBgStyle({
          background: `linear-gradient(to bottom, ${color.rgb} 0%, ${color.rgb} 10%, ${color.rgb} 20%, ${color.rgb} 50%, black 140%, black 70%, black 100%)`,
        })

      } catch (e) {
        console.error(e)
      }
    }
  }


  return user ? (
    <section className="user-profile" style={bgStyle}>
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
              className="user-profile-img pointer"
              style={{ maxWidth: '200px' }}
              src={
                user?.imgUrl
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
