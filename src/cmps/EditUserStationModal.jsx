import React from 'react'
import { getSpotifySvg } from '../services/SVG.service'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editUserStation } from '../store/actions/station.actions'
import { uploadImg } from '../services/upload.service'
import emptyImg from '../assets/imgs/empty-img.png'
export function EditUserStationModal({ station, onClose }) {
  const [isHovered, setIsHovered] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const dispatch = useDispatch()

  const [stationName, setStationName] = useState(station.name)
  const [stationDesc, setStationDesc] = useState(station.description)
  const [stationImg, setStationImg] = useState(station.imgUrl)
  function handleMouseEnter() {
    setIsHovered(true)
  }

  function handleMouseLeave() {
    setIsHovered(false)
  }

  const handleInputFocus = (inputIndex) => {
    setFocusedInput(inputIndex)
  }

  function onChangeStationName(e) {
    setStationName(e.target.value)
  }

  function onChangeStationDesc(e) {
    setStationDesc(e.target.value)
  }
  function handleSave() {
    console.log('station before', station)
    dispatch(editUserStation(station._id, stationName, stationDesc, stationImg))
    onClose()
    console.log('station after', station)
  }

  function handleInputBlur() {
    setFocusedInput(null)
  }

  function onCloseEditModal() {
    onClose()
  }

  async function handelFile(ev) {
    const file =
      ev.type === 'change' ? ev.target.files[0] : ev.dataTransfer.files[0]
    try {
      setIsUploading(true)
      const { url } = await uploadImg(file)
      setStationImg(url)
    } catch (err) {
      console.log('err', err)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <section className="modal-container">
      <div className="modal-header flex align-center">
        <h2 className="edit-details">Edit details</h2>
        <span
          onClick={onCloseEditModal}
          className="x flex align-center justify-center pointer"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('x'),
          }}
        ></span>
      </div>
      <div className="edit-actions">
        <label
          onDrop={(e) => {
            e.preventDefault()
            handelFile(e)
          }}
          onDragOver={(e) => {
            e.preventDefault()
          }}
          className="cover-img"
        >
          {isUploading ? (
            <span className="loader"></span>
          ) : (
            <img
              className="img-edit"
              src={stationImg ? stationImg : emptyImg}
              alt="user station img"
            />
          )}
          <input type="file" onChange={handelFile} className="hidden" />
        </label>
        {/* <div
          className="default-image-div"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span
            className="music-note"
            dangerouslySetInnerHTML={{
              __html: isHovered
                ? getSpotifySvg("editImgIcon")
                : getSpotifySvg("userStationImg"),
            }}
          ></span>
        </div> */}

        <div className="flex column inputs-container">
          <input
            type="text"
            placeholder="Add a name"
            onFocus={() => handleInputFocus(1)}
            onChange={(e) => onChangeStationName(e)}
            onBlur={handleInputBlur}
          />
          {focusedInput === 1 && <span className="name-span">Name</span>}
          <input
            className="bigger-input"
            type="text"
            placeholder="Add an optional description"
            onFocus={() => handleInputFocus(2)}
            onChange={(e) => onChangeStationDesc(e)}
            onBlur={handleInputBlur}
          />
          {focusedInput === 2 && (
            <span className="descp-span">Description</span>
          )}
        </div>
      </div>
      <button onClick={handleSave}>Save</button>
    </section>
  )
}
