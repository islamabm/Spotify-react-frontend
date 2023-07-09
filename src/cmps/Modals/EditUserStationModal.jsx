import React from 'react'
import { getSpotifySvg } from '../../services/SVG.service'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editUserStation } from '../../store/actions/station.actions'
import { uploadImg } from '../../services/upload.service'
import emptyImg from '../../assets/imgs/empty-img.png'
import AIImageGenerator from './AIImageGenerator'
export function EditUserStationModal({ station, onClose }) {
  const [focusedInput, setFocusedInput] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const dispatch = useDispatch()

  const [editedStation, setEditedStation] = useState({ ...station })

  function handleInputFocus(inputIndex) {
    setFocusedInput(inputIndex)
  }

  function onChangeStationName(e) {
    setEditedStation({ ...editedStation, name: e.target.value })
  }

  function onChangeStationDesc(e) {
    setEditedStation({ ...editedStation, desc: e.target.value })
  }
  function handleSave() {
    dispatch(editUserStation(editedStation))
    onClose()
  }

  function handleInputBlur() {
    setFocusedInput(null)
  }

  function onCloseEditModal() {
    onClose()
  }

  function openAiModal() {
    setShowModal(true)
  }
  function handleImageGenerated(url) {
    setEditedStation({ ...editedStation, imgUrl: url })
  }

  function handleCloseAiModal() {
    setShowModal(false)
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

  return (
    <>
      <section className="modal-container">
        <div className="modal-header flex align-center">
          <h2 className="edit-details">Edit details</h2>
          <h1 className="openai" onClick={openAiModal}>
            Generate with AI
          </h1>
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
              <span className="loader-img"></span>
            ) : (
              <img
                className="img-edit"
                src={editedStation.imgUrl ? editedStation.imgUrl : emptyImg}
                alt="user station img"
              />
            )}
            <input type="file" onChange={handelFile} className="hidden" />
          </label>
          <div className="flex column inputs-container">
            <input
              type="text"
              placeholder="Add a name"
              onFocus={() => handleInputFocus(1)}
              onChange={(e) => onChangeStationName(e)}
              onBlur={handleInputBlur}
            />
            {focusedInput === 1 && <span className="name-span">Name</span>}
            <textarea
              className="bigger-input"
              type="text"
              placeholder="Add an optional description"
              onFocus={() => handleInputFocus(2)}
              onChange={(e) => onChangeStationDesc(e)}
              onBlur={handleInputBlur}
            ></textarea>
            {focusedInput === 2 && (
              <span className="descp-span">Description</span>
            )}
          </div>
        </div>
        <button onClick={handleSave}>Save</button>
      </section>
      {showModal && (
        <AIImageGenerator
          closeAiModal={handleCloseAiModal}
          onImageGenerated={handleImageGenerated}
        />
      )}
    </>
  )
}
