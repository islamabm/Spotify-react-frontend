import React from 'react'
import { getSpotifySvg } from '../services/SVG.service'
import { useState } from 'react'

export function EditUserStationModal() {
  const [isHovered, setIsHovered] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)

  const handleMouseEnter = () => {
    console.log('hi')
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

  return (
    <section className="modal-container">
      <div className="modal-header flex align-center">
        <h2>Edit details</h2>
        <span
          className="x flex align-center justify-center pointer"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('x'),
          }}
        ></span>
      </div>
      <div className="edit-actions">
        <div
          className="default-image-div"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span
            className="music-note"
            dangerouslySetInnerHTML={{
              __html: isHovered
                ? getSpotifySvg('editImgIcon')
                : getSpotifySvg('userStationImg'),
            }}
          ></span>
        </div>

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
      <p>
        By proceeding, you agree to give Spotify access to the image you choose
        to upload. Please make sure you have the right to upload the image.
      </p>
    </section>
  )
}
