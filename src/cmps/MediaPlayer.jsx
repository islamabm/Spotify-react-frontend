import React, { useRef, useState, useEffect } from 'react'
import { getSpotifySvg } from '../services/SVG.service'
import { stationService } from '../services/station.service'
import {
  getRandomSong,
  setPrevSong,
  setNextSong,
} from '../store/actions/song.actions'
import YouTube from 'react-youtube'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export function MediaPlayer({ volume }) {
  const [videoId, setVideoId] = useState('M7lc1UVf-VE')
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeated, setIsRepeated] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showInMobile, setShowInMobile] = useState('')
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [displayDuration, setDisplayDuration] = useState('0:00')
  const [displayTime, setDisplayTime] = useState('0:00')
  const [localVolume, setLocalVolume] = useState(volume || 50)
  const [shuffleAfterSongEnds, setShuffleAfterSongEnds] = useState(false)
  const [repeatMode, setRepeatMode] = useState('off')

  const song = useSelector((storeState) => storeState.songModule.currSong)
  const id = useSelector((storeState) => storeState.songModule.videoId)
  const songId = useSelector((storeState) => storeState.songModule.currSongId)
  const stationId = useSelector(
    (storeState) => storeState.stationModule.currStationId
  )
  const currSvg = useSelector((storeState) => storeState.songModule.currentSvg)

  const location = useLocation()
  const dispatch = useDispatch()
  const progressBarRef = useRef(null)
  let playerRef = useRef(null)
  let interval = null

  const progressBarWidth = duration
    ? `${(currentTime / duration) * 100}%`
    : '0%'
  const videoOptions = {
    playerVars: {
      autoplay: 1,
    },
  }

  useEffect(() => {
    setLocalVolume(volume)
    if (playerRef.current) {
      playerRef.current.setVolume(volume)
    }
  }, [volume])

  useEffect(() => {
    if (location.pathname === '/mobileMediaPlayer') {
      setShowInMobile('show-in-mobile')
    } else {
      setShowInMobile('')
    }
  }, [location.pathname])

  useEffect(() => {
    if (id) setVideoId(id)
  }, [id])

  useEffect(() => {
    if (song && song.title && song.artist) {
      const searchStr = `${song.artist} ${song.title}`
      const cachedVideoId = stationService.getVideoIdCache(song)
      if (cachedVideoId) {
        setVideoId(cachedVideoId)
      } else {
        stationService
          .getVideos(searchStr)
          .then((videos) => {
            if (videos.length > 0) {
              stationService.setVideoIdCache(song, videos[0].videoId)
              setVideoId(videos[0].videoId)
            }
          })
          .catch((error) => {
            console.error('Error getting videos:', error)
          })
      }
    }
  }, [song])

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  useEffect(() => {
    if (playerRef.current) {
      switch (currSvg) {
        case 'play':
          if (!isPlaying) {
            playerRef.current.playVideo()
            setIsPlaying(true)
          }
          break
        case 'pause':
          if (isPlaying) {
            playerRef.current.pauseVideo()
            setIsPlaying(false)
          }
          break
        default:
          console.error(`Unknown SVG action: ${currSvg}`)
      }
    }
  }, [currSvg])

  function onEndSong() {
    if (repeatMode === 'repeat_one') {
      playerRef.current.playVideo()
      setRepeatMode('off')
    } else if (repeatMode === 'repeat_more') {
      playerRef.current.playVideo()
    } else if (shuffleAfterSongEnds) {
      setShuffleAfterSongEnds(false)
      dispatch(getRandomSong(stationId))
    } else {
      getNextSong()
    }
  }

  function onReady(event) {
    playerRef.current = event.target
    const duration = event.target.getDuration()
    setDuration(duration)
    const minutes = Math.floor(duration / 60)
    const seconds = Math.round(duration % 60)
    setDisplayDuration(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`)
    event.target.pauseVideo()
  }

  function handleMouseDown() {
    setIsMouseDown(true)
  }

  function handleMouseMove(e) {
    if (isMouseDown) {
      handleProgressBarClick(e)
    }
  }

  function handleMouseUp() {
    setIsMouseDown(false)
  }

  function onPlaySong() {
    if (!playerRef.current) return
    setIsPlaying(true)
    interval = setInterval(() => {
      const currentTime = playerRef.current.getCurrentTime()
      setCurrentTime(Math.floor(currentTime))

      const minutes = Math.floor(currentTime / 60)
      const seconds = Math.round(currentTime % 60)
      setDisplayTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`)
    }, 1000)
  }

  function onPauseSong() {
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
    if (isPlaying) {
      setShuffleAfterSongEnds(true)
    } else {
      dispatch(getRandomSong(stationId))
    }
    setIsShuffled(!isShuffled)
  }

  function handleProgressBarClick(e) {
    if (progressBarRef.current && playerRef.current) {
      const progressBar = progressBarRef.current

      const clickPositionInPage = e.pageX
      const progressBarStartInPage = progressBar.getBoundingClientRect().left
      const clickPositionInBar = clickPositionInPage - progressBarStartInPage
      const percentageOfBarClicked =
        clickPositionInBar / progressBar.offsetWidth
      const newTimeInSong =
        playerRef.current.getDuration() * percentageOfBarClicked

      playerRef.current.seekTo(newTimeInSong)
    }
  }

  function onRepeatClicked() {
    switch (repeatMode) {
      case 'off':
        setRepeatMode('repeat_one')
        setIsRepeated(true)
        break
      case 'repeat_one':
        setRepeatMode('repeat_more')
        break
      case 'repeat_more':
        setRepeatMode('off')
        setIsRepeated(false)
        break
      default:
        setRepeatMode('off')
        setIsRepeated(false)
        break
    }
  }

  function handlePlayPauseClick() {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
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
        onEnd={onEndSong}
        className="hidden-player"
      />
      <div className="media-player">
        <div className={`control-buttons ${showInMobile}`}>
          {isShuffled ? (
            <button className="is-repeated">
              <span
                onClick={onShuffleClicked}
                className="pointer title shuffle"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('shouffleIcon'),
                }}
              ></span>{' '}
            </button>
          ) : (
            <span
              className="pointer title shuffle"
              onClick={onShuffleClicked}
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('shouffleIcon'),
              }}
            ></span>
          )}
          <span
            onClick={getPrevSong}
            className="pointer title prev"
            dangerouslySetInnerHTML={{ __html: getSpotifySvg('prevIcon') }}
          ></span>
          <div className="play-song-div">
            {' '}
            <span
              className="special-i pointer play-pause"
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
            className="pointer title next"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('nextIcon'),
            }}
          ></span>{' '}
          {repeatMode === 'off' ? (
            <span
              onClick={onRepeatClicked}
              className="pointer title repeat"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('repeateIcon'),
              }}
            ></span>
          ) : repeatMode === 'repeat_one' ? (
            <button className="is-repeated">
              <span
                onClick={onRepeatClicked}
                className="pointer title repeat"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('repeateIcon'),
                }}
              ></span>
            </button>
          ) : (
            <button className="is-repeated">
              <span
                onClick={onRepeatClicked}
                className="pointer title repeat"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('repeatMore'),
                }}
              ></span>
            </button>
          )}
        </div>

        <div className="music-bar">
          <span className={`current-time ${showInMobile} start hiding`}>
            {displayTime}
          </span>
          <div
            className="progress-bar"
            ref={progressBarRef}
            onClick={handleProgressBarClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <div
              className="progress-bar-fill"
              style={{ width: progressBarWidth }}
            ></div>
          </div>
          <span className={`current-time ${showInMobile} end hiding`}>
            {displayDuration}
          </span>
        </div>
      </div>
    </>
  )
}

export default MediaPlayer
