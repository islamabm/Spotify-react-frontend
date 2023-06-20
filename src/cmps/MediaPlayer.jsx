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
            className="pointer"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('shouffleIcon'),
            }}
          ></span>{' '}
          <span
            className="pointer"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('prevIcon'),
            }}
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
          <span
            className="pointer"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('prevSongBtnIcon'),
            }}
          ></span>
        </div>

        <div class="music-bar">
          <span class="current-time hiding">0:00</span>
          <div class="progress-bar">
            <div class="progress-bar-fill"></div>
          </div>
          <span class="current-time hiding">3:30</span>
        </div>
      </div>
    </>
  )
}

export default MediaPlayer
