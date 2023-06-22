import React, { useRef, useState, useEffect } from 'react'
import { getSpotifySvg } from '../services/SVG.service'
// import { HoverModal } from './HoverModal'
import { stationService } from '../services/station.service'
import YouTube from 'react-youtube'
import { useDispatch, useSelector } from 'react-redux'
export function MediaPlayer() {
  const song = useSelector((storeState) => storeState.songModule.currSong)
  console.log('song', song)

  const [videoId, setVideoId] = useState('M7lc1UVf-VE')

  const videoOptions = {
    playerVars: {
      autoplay: 1,
    },
  }
  useEffect(() => {
    if (song && song.title && song.artist) {
      const searchStr = `${song.artist} ${song.title}`
      stationService
        .getVideos(searchStr)
        .then((videos) => {
          if (videos.length > 0) {
            setVideoId(videos[0].videoId)
          }
        })
        .catch((error) => {
          console.error('Error getting videos:', error)
        })
    }
  }, [song])

  const onReady = (event) => {
    event.target.pauseVideo()
  }
  return (
    <>
      <YouTube
        videoId={videoId}
        opts={videoOptions}
        onReady={onReady}
        // onPause={func}
        className="hidden-player"
      />
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
