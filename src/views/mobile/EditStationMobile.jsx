import React, { useState } from 'react'
import { getSpotifySvg } from '../../services/SVG.service'
import { EditStationMobileList } from './EditStationMobileList'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editUserStation } from '../../store/actions/station.actions'
import { uploadImg } from '../../services/upload.service'
import emptyImg from '../../assets/imgs/empty-img.png'
export function EditStationMobile() {
  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const [editedStation, setEditedStation] = useState({ ...station })
  const [showDescInput, setShowDescInput] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function onCloseEditModal() {
    navigate('/')
  }

  function onChangeStationName(e) {
    setEditedStation({ ...editedStation, name: e.target.value })
  }
  function onChangeStationDesc(e) {
    setEditedStation({ ...editedStation, desc: e.target.value })
  }

  function openDescInput() {
    setShowDescInput(true)
  }

  function handleSave() {
    setShowDescInput(false)
    dispatch(editUserStation(editedStation))
    navigate('/')
  }

  async function handelFile(ev) {
    const file =
      ev.type === 'change' ? ev.target.files[0] : ev.dataTransfer.files[0]
    try {
      setIsUploading(true)
      const { url } = await uploadImg(file)
      setEditedStation({ ...editedStation, imgUrl: url })
    } catch (err) {
      console.log('err', err)
    } finally {
      setIsUploading(false)
    }
  }

  // function onChangeStationDesc(e) {
  //   setEditedStation({ ...editedStation, desc: e.target.value })
  // }

  return (
    <section className="edit-station-mobile">
      <div className="edit-station-mobile-header flex align-center">
        <span className="edit-station-save" onClick={handleSave}>
          Save
        </span>
        <span className="edit-station-text">Edit playlist</span>
        <span
          onClick={onCloseEditModal}
          className="edit-station-x flex pointer"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('x'),
          }}
        ></span>
      </div>
      <div className="edit-station-mobile-img-container flex justify-center">
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
            <span className="loader-img"></span>
          ) : (
            <img
              className="edit-station-mobile-img"
              src={editedStation.imgUrl ? editedStation.imgUrl : emptyImg}
              alt="edit station mobile img"
            />
          )}
          <input type="file" onChange={handelFile} className="hidden" />
        </label>
        <span className="edit-station-mobile-change-img">Change image</span>
      </div>
      <div className="edit-station-mobile-input-container flex justify-center align-center">
        <input
          className="edit-station-mobile-input"
          type="text"
          placeholder={station.name}
          onChange={(e) => onChangeStationName(e)}
        />
        {showDescInput ? (
          <input
            className="edit-station-mobile-input"
            type="text"
            placeholder={station.desc}
            onChange={(e) => onChangeStationDesc(e)}
          />
        ) : (
          <button
            onClick={openDescInput}
            className="edit-station-mobile-description"
          >
            Add description
          </button>
        )}
      </div>
      {station?.songs && (
        <div className="edit-station-song-list">
          <EditStationMobileList list={station.songs} />
        </div>
      )}
    </section>
  )
}
