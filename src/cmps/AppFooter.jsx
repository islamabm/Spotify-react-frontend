import React, { useEffect, useState } from 'react'
import { getSpotifySvg } from '../services/SVG.service'
import { setCurrSongLyrics } from '../store/actions/song.actions'
import { MediaPlayer } from './MediaPlayer'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BubblingHeart } from './BubblingHeart'

export function AppFooter() {
  const [mute, setMute] = useState(false)
  const [volume, setVolume] = useState(50)
  const [isLyrics, setIsLyrics] = useState(false)
  
  const song = useSelector((storeState) => storeState.songModule.currSong)
  const [currSong, setCurrSong] = useState(song)
  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    setCurrSong(song)
  }, [song])

  function handleVolumeChange(event) {
    setVolume(event.target.value)
  }
  
  function onRepeatClicked() {
    setIsLyrics(!isLyrics)
  }

  function onLyricsClicked() {
    dispatch(setCurrSongLyrics(song.artist, song.title))
    navigate('/only/lyrics')
  }

  function setSvg() {
    if (volume > 80) return 'volumeIcon'
    if (volume > 30 && volume < 80) return 'mediumVolumeIcon'
    if (volume > 1 && volume < 30) return 'veryShortVolumeIcon'
    else return 'muteIcon'
  }

  function onToggleMute() {
    if (setSvg() === 'muteIcon') {
      setVolume(100)
      setMute(false)
    } else {
      setVolume(0)
      setMute(true)
    }
  }

  return (
    <div className="app-footer">
      <div className="song-details">
        {currSong && (
          <>
            <div className="image">
              <img
                src={song ? song.imgUrl : station?.songs[0]?.imgUrl}
                alt="song-img"
              />
            </div>
            <div className="actor-name-song">
              <p className="song-name">
                {song ? song.title : station?.songs[0]?.title}
              </p>
              <p className="actor-name">
                {song ? song.artist : station?.songs[0]?.artist}
              </p>
            </div>

            <div className="heart-picture-icons ">
              <span className="footer-heart">
                <BubblingHeart index={song._id} item={song} type="song" />
              </span>
            </div>
          </>
        )}
      </div>

      <div className="media-player">
        <MediaPlayer volume={volume} />
      </div>
      <div className="song-details-two">
        {' '}
        {isLyrics ? (
          <button className="is-repeated">
            <span
              title="Lyrics"
              onClick={onRepeatClicked}
              className="pointer title"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('lyricsIcon'),
              }}
            ></span>{' '}
          </button>
        ) : (
          <span
            title="Lyrics"
            onClick={onLyricsClicked}
            className="pointer title lyrics"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('lyricsIcon'),
            }}
          ></span>
        )}
        <span
          title={mute ? 'Unmute' : 'Mute'}
          onClick={onToggleMute}
          className="pointer title mute"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg(setSvg()),
          }}
        ></span>
        <div className="slider-container">
          <input
            className="range-slider"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
          />
          <span className="range-thumb"></span>
        </div>
      </div>
    </div>
  )
}
