import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { uploadImg } from '../services/upload.service'
import { editUserImg, getUser } from '../store/actions/user.actions'
import { FastAverageColor } from 'fast-average-color'
import { getSpotifySvg } from '../services/SVG.service'
import { eventBus } from '../services/event-bus.service'
import { useNavigate } from 'react-router-dom'
import { loadUserStations } from '../store/actions/station.actions'
import { UserDetailsList } from '../cmps/UserDetailsStations/UserDetailsList'

export function UserDetails() {
  const [isUploading, setIsUploading] = useState(false)
  const [bgStyle, setBgStyle] = useState(null)

  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const stations = useSelector(
    (storeState) => storeState.stationModule.userStations
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const colorCache = {}
  const userDetailsRef = useRef(null)

  useEffect(() => {
    dispatch(getUser())
    updateImgUrlAndColor(user.imgUrl)
  }, [user.imgUrl])

  useEffect(() => {
    dispatch(loadUserStations())
  }, [user])

  useEffect(() => {
    const currentUserDetailsRef = userDetailsRef.current
    const handleScroll = () => {
      const scrollPos = currentUserDetailsRef.scrollTop
      eventBus.emit('userDetailsScroll', { scrollPos, bgStyle })
    }
    if (currentUserDetailsRef) {
      currentUserDetailsRef.addEventListener('scroll', handleScroll, {
        passive: true,
      })
    }
    return () => {
      if (currentUserDetailsRef) {
        currentUserDetailsRef.removeEventListener('scroll', handleScroll, {
          passive: true,
        })
      }
    }
  }, [bgStyle])

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

  function updateImgUrlAndColor(userImg) {
    if (!user.imgUrl) return
    getDominantColor(userImg)
  }

  async function getDominantColor(imageSrc) {
    const cachedColor = colorCache[imageSrc]
    if (cachedColor) {
      const gradient = `linear-gradient(to bottom, ${cachedColor} 0%, ${cachedColor} 80vh, black 80vh, black 100%)`

      setBgStyle(gradient)

      document.body.style.backgroundImage = gradient
      return
    }
    const fac = new FastAverageColor()
    const img = new Image()

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

  function goHome() {
    navigate('/')
  }

  return user ? (
    <section className="user-page" ref={userDetailsRef}>
      <section className="user-profile" style={bgStyle}>
        <button className="user-details-arrow" onClick={goHome}>
          <span
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('leftArrow'),
            }}
          ></span>
        </button>
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
              <div className="loader-img"></div>
            ) : (
              <img
                className="user-profile-img pointer"
                style={{ width: window.innerWidth > 460 ? '200px' : '124px' }}
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
      <section className="user-details-index">
        <UserDetailsList stations={stations} />
      </section>
    </section>
  ) : null
}
