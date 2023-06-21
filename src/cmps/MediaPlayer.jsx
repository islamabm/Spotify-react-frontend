import React, { useRef, useState } from 'react'
import { getSpotifySvg } from '../services/SVG.service'
import { HoverModal } from './HoverModal'
export function MediaPlayer() {
  const shuffleRef = useRef(null)
  const prevRef = useRef(null)

  const [modalMessage, setModalMessage] = useState('')
  return (
    <>
      {/* Note that there's no React equivalent for the 'YouTube' component */}
      {/* Replace it with the appropriate component or HTML element */}

      <div className="media-player">
        {/* <HoverModal
          triggerRef={modalMessage === 'Enable shuffle' ? shuffleRef : prevRef}
          message={modalMessage}
        />{' '} */}
        <div className="control-buttons">
          <span
            className="pointer"
            dangerouslySetInnerHTML={{ __html: getSpotifySvg('shouffleIcon') }}
            ref={shuffleRef}
            onMouseEnter={() => setModalMessage('Enable shuffle')}
            onMouseLeave={() => setModalMessage('')}
          ></span>
          <span
            className="pointer"
            dangerouslySetInnerHTML={{ __html: getSpotifySvg('prevIcon') }}
            ref={prevRef}
            onMouseEnter={() => setModalMessage('Previous')}
            onMouseLeave={() => setModalMessage('')}
          ></span>
          <div className="play-song-div">
            {' '}
            <span
              className="special-i pointer"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('playIcon'),
              }}
            ></span>
          </div>
          {/* <i className="pause"></i> */}{' '}
          <span
            className="pointer"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('nextIcon'),
            }}
          ></span>{' '}
          <span
            className="pointer"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('repeateIcon'),
            }}
          ></span>{' '}
        </div>

        <div className="music-bar">
          <span className="current-time hiding">0:00</span>
          <div className="progress-bar">
            <div className="progress-bar-fill"></div>
          </div>
          <span className="current-time hiding">3:30</span>
        </div>
      </div>
    </>
  )
}

export default MediaPlayer
