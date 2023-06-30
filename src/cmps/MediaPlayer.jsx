import React, { useRef, useState, useEffect } from 'react'
import { getSpotifySvg } from '../services/SVG.service'
// import { HoverModal } from './HoverModal'
import { PAUSE_SONG, PLAY_SONG, eventBus } from '../services/event-bus.service'
import { stationService } from '../services/station.service'
import {
  getRandomSong,
  setPrevSong,
  setNextSong,
} from '../store/actions/song.actions'
import YouTube from 'react-youtube'
import { useDispatch, useSelector } from 'react-redux'
export function MediaPlayer({ volume }) {
  const song = useSelector((storeState) => storeState.songModule.currSong)
  const songId = useSelector((storeState) => storeState.songModule.currSongId)
  const dispatch = useDispatch()
  const stationId = useSelector(
    (storeState) => storeState.stationModule.currStationId
  )
  const progressBarRef = useRef(null)
  const [videoId, setVideoId] = useState('M7lc1UVf-VE')
  const [isShuffled, setIsShuffled] = useState(false)
  const [isRepeated, setIsRepeated] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [displayDuration, setDisplayDuration] = useState('0:00')
  const [displayTime, setDisplayTime] = useState('0:00')

  const [localVolume, setLocalVolume] = useState(volume || 50)

  useEffect(() => {
    setLocalVolume(volume)
    if (playerRef.current) {
      playerRef.current.setVolume(volume)
    }
  }, [volume])

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
      const cachedVideoId = stationService.getVideoIdCache(song)
      if (cachedVideoId) {
        console.log('getr from locale')
        setVideoId(cachedVideoId)
      } else {
        console.log('get from api')
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
    const stopPlay = () => {
      console.log('hi event bus')
      if (playerRef.current) {
        playerRef.current.pauseVideo()
      }
    }

    eventBus.on(PAUSE_SONG, stopPlay)

    return () => {
      eventBus.off(PAUSE_SONG, stopPlay)
    }
  }, [])
  useEffect(() => {
    const playSong = () => {
      if (playerRef.current) {
        playerRef.current.playVideo()
      }
    }

    eventBus.on(PLAY_SONG, playSong)

    return () => {
      eventBus.off(PLAY_SONG, playSong)
    }
  }, [])

  function onEndSong() {
    if (isRepeated) {
      playerRef.current.playVideo()
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
  function onPlaySong() {
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
    setIsShuffled(!isShuffled)
    dispatch(getRandomSong(stationId))
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
    setIsRepeated(!isRepeated) // Toggle the repeat option when the repeat button is clicked
  }

  function handlePlayPauseClick() {
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
        onEnd={onEndSong}
        className="hidden-player"
      />
      <div className="media-player">
        <div className="control-buttons">
          {isShuffled ? (
            <button className="is-repeated">
              <span
                onClick={onShuffleClicked}
                className="pointer"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('shouffleIcon'),
                }}
              ></span>{' '}
            </button>
          ) : (
            <span
              onClick={onShuffleClicked}
              className="pointer"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('shouffleIcon'),
              }}
            ></span>
          )}
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
          {isRepeated ? (
            <button className="is-repeated">
              <span
                onClick={onRepeatClicked}
                className="pointer"
                dangerouslySetInnerHTML={{
                  __html: getSpotifySvg('repeateIcon'),
                }}
              ></span>{' '}
            </button>
          ) : (
            <span
              onClick={onRepeatClicked}
              className="pointer"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('repeateIcon'),
              }}
            ></span>
          )}
        </div>

        <div className="music-bar">
          <span className="current-time hiding">{displayTime}</span>
          <div
            className="progress-bar"
            ref={progressBarRef}
            onClick={handleProgressBarClick}
          >
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
