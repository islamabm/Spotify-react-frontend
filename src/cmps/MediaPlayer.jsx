import React from 'react'
import { getSpotifySvg } from '../services/SVG.service'
export function MediaPlayer() {
  return (
    <>
      {/* Note that there's no React equivalent for the 'YouTube' component */}
      {/* Replace it with the appropriate component or HTML element */}

      <div className="media-player">
        <div className="control-buttons">
          <button
            title="Enable shuffle"
            className="shuffle media-player-prev-song hiding"
          >
            <i>
              {' '}
              <span
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('shuffleBtnIcon'),
                }}
              ></span>
            </i>
          </button>
          <button
            title="Previous"
            className="prev media-player-prev-song hiding"
          >
            <i>
              {' '}
              <span
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('prevSongBtnIcon'),
                }}
              ></span>
            </i>
          </button>
          <button title="Play" className="media-player-play">
            {/* <i className="pause"></i> */}
            <i>
              {' '}
              <span
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('prevSongBtnIcon'),
                }}
              ></span>
            </i>
          </button>
          <button title="Next" className="next media-player-prev-song hiding">
            <i>
              {' '}
              <span
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('prevSongBtnIcon'),
                }}
              ></span>
            </i>
          </button>
          <button
            title="Enable repeat"
            className="media-player-repeat-song hiding"
          >
            <i>
              {' '}
              <span
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('prevSongBtnIcon'),
                }}
              ></span>
            </i>
          </button>
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
