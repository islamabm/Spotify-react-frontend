import React from "react"
import { getSpotifySvg } from "../services/SVG.service"
import { useState } from "react"
import { uploadImg } from "../services/upload.service"
import emptyImg from '../assets/imgs/empty-img.png'
export function EditUserStationModal({ station }) {
  const [isHovered, setIsHovered] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleInputFocus = (inputIndex) => {
    setFocusedInput(inputIndex)
  }

  const handleInputBlur = () => {
    setFocusedInput(null)
  }

  async function handelFile(ev) {
    const file =
      ev.type === "change" ? ev.target.files[0] : ev.dataTransfer.files[0]
    try {
      const { url } = await uploadImg(file)
      station.imgUrl = url
    } catch (err) {
      console.log("err", err)
    }
  }

  return (
    <section className="modal-container">
      <div className="modal-header flex align-center">
        <h2 className="edit-details">Edit details</h2>
        <span
          className="x flex align-center justify-center pointer"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg("x"),
          }}
        ></span>
      </div>
      <div className="edit-actions">
        <label className="cover-img" >
        <img className="img-edit" src={station.imgUrl? station.imgUrl : emptyImg} alt="user station img" />  
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
            onBlur={handleInputBlur}
          />
          {focusedInput === 1 && <span className="name-span">Name</span>}
          <input
            className="bigger-input"
            type="text"
            placeholder="Add an optional description"
            onFocus={() => handleInputFocus(2)}
            onBlur={handleInputBlur}
          />
          {focusedInput === 2 && (
            <span className="descp-span">Description</span>
          )}
        </div>
      </div>
      <button>Save</button>
    </section>
  )
}
