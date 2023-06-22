import React, { useRef, useState } from 'react'
import { getSpotifySvg } from '../services/SVG.service'
// import { HoverModal } from './HoverModal'
import { stationService } from '../services/station.service'
import YouTube from 'react-youtube'
import { useDispatch, useSelector } from 'react-redux'
export function MediaPlayer() {
  const song = useSelector((storeState) => storeState.songModule.currSong)
  console.log('song', song)

  const videoOptions = {
    // height: '390',
    // width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  }

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }
  return (
    <>
      <YouTube videoId="M7lc1UVf-VE" opts={videoOptions} onReady={onReady} />
      <div className="media-player">
        <div className="control-buttons">
          <span
            className="pointer"
            dangerouslySetInnerHTML={{ __html: getSpotifySvg('shouffleIcon') }}
          ></span>
          <span
            className="pointer"
            dangerouslySetInnerHTML={{ __html: getSpotifySvg('prevIcon') }}
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
