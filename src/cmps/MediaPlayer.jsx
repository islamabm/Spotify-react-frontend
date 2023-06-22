import React, { useRef, useState, useEffect } from 'react'
import { getSpotifySvg } from '../services/SVG.service'
// import { HoverModal } from './HoverModal'
import { stationService } from '../services/station.service'
import {
  getRandomSong,
  setPrevSong,
  setNextSong,
} from '../store/actions/song.actions'
import YouTube from 'react-youtube'
import { useDispatch, useSelector } from 'react-redux'
export function MediaPlayer() {
  const song = useSelector((storeState) => storeState.songModule.currSong)
  const songId = useSelector((storeState) => storeState.songModule.currSongId)
  const dispatch = useDispatch()
  const stationId = useSelector(
    (storeState) => storeState.stationModule.currStationId
  )
  const [videoId, setVideoId] = useState('M7lc1UVf-VE')
  const [isShuffled, setIsShuffled] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [displayDuration, setDisplayDuration] = useState('0:00')
  const [displayTime, setDisplayTime] = useState('0:00')
  let interval = null
  let playerRef = useRef(null)
  const progressBarWidth = duration
    ? `${(currentTime / duration) * 100}%`
    : '0%'
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
    const duration = event.target.getDuration()
    setDuration(duration) // here, duration is a number
    const minutes = Math.floor(duration / 60)
    const seconds = Math.round(duration % 60)
    setDisplayDuration(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`) // here, displayDuration is a string
    event.target.pauseVideo()
  }
  const onPlaySong = () => {
    setIsPlaying(true)
    interval = setInterval(() => {
      const currentTime = playerRef.current.getCurrentTime()
      setCurrentTime(Math.floor(currentTime))

      const minutes = Math.floor(currentTime / 60)
      const seconds = Math.round(currentTime % 60)
      setDisplayTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`) // Update displayTime
    }, 1000)
  }
  const onPauseSong = () => {
    setIsPlaying(false)
    clearInterval(interval)
  }
  function getPrevSong() {
    dispatch(setPrevSong(stationId, songId))
  }

  function getNextSong() {
    dispatch(setNextSong(stationId, songId))
  }

  function onShuffleClicked() {
    setIsShuffled(!isShuffled)
    dispatch(getRandomSong(stationId))
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
            onClick={getPrevSong}
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
            onClick={getNextSong}
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
          <span className="current-time hiding">{displayTime}</span>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: progressBarWidth }}
            ></div>
          </div>
          <span className="current-time hiding">{displayDuration}</span>
        </div>
      </div>
    </>
  )
}

export default MediaPlayer
