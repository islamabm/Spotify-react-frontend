import React from 'react'
import { getSpotifySvg } from '../services/SVG.service'
export function MediaPlayer() {
  return (
    <>
      {/* Note that there's no React equivalent for the 'YouTube' component */}
      {/* Replace it with the appropriate component or HTML element */}

      <div className="media-player">
        <div className="control-buttons">
          {' '}
          <span
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('shouffleIcon'),
            }}
          ></span>{' '}
          <span
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('prevIcon'),
            }}
          ></span>
          <div className="play-song-div">
            {' '}
            <span
              className="special-i"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('playIcon'),
              }}
            ></span>
          </div>
          {/* <i className="pause"></i> */}{' '}
          <span
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('nextIcon'),
            }}
          ></span>{' '}
          <span
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('repeateIcon'),
            }}
          ></span>{' '}
          <span
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('prevSongBtnIcon'),
            }}
          ></span>
        </div>

        <div className="music-bar">
          <span className="current-time hiding"></span>
          <div className="progress-bar">
            <div className="progress-bar-fill"></div>
          </div>
          <span className="current-time hiding"></span>
        </div>
      </div>

      <div className="footer-media-adjusments">
        <i className="speaker"></i>
        <input
          type="range"
          className="speaker-bar"
          min="0"
          max="100"
          step="10"
          id="volume-bar"
        />
      </div>
    </>
  )
}

export default MediaPlayer
