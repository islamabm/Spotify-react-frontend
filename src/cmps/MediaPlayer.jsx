import React, { useRef, useState, useEffect } from 'react'
import { getSpotifySvg } from '../services/SVG.service'
// import { HoverModal } from './HoverModal'
import { stationService } from '../services/station.service'
import { getRandomSong } from '../store/actions/song.actions'
import YouTube from 'react-youtube'
import { useDispatch, useSelector } from 'react-redux'
export function MediaPlayer() {
  const song = useSelector((storeState) => storeState.songModule.currSong)
  const dispatch = useDispatch()
  const stationId = useSelector(
    (storeState) => storeState.stationModule.currStationId
  )
  const [videoId, setVideoId] = useState('M7lc1UVf-VE')
  const [isShuffled, setIsShuffled] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  let playerRef = useRef(null)

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
    playerRef.current = event.target
    event.target.pauseVideo()
  }

  const onPlaySong = () => {
    setIsPlaying(true)
  }

  function onShuffleClicked() {
    setIsShuffled(!isShuffled)
    dispatch(getRandomSong(stationId))
  }

  const onPauseSong = () => {
    setIsPlaying(false)
  }

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
  }
  return (
    <>
      <YouTube
        videoId={videoId}
        opts={videoOptions}
        onReady={onReady}
        onPlay={onPlaySong}
        onPause={onPauseSong}
        className="hidden-player"
      />
      <div className="media-player">
        <div className="control-buttons">
          <span
            onClick={onShuffleClicked}
            className={`pointer ${isShuffled ? 'green-fill' : ''}`}
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
              onClick={handlePlayPauseClick}
              dangerouslySetInnerHTML={{
                __html: isPlaying
                  ? getSpotifySvg('pauseIcon')
                  : getSpotifySvg('playIcon'),
              }}
            ></span>
          </div>
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
