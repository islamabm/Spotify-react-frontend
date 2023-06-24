import React, { useState } from 'react'
import { getSpotifySvg } from '../services/SVG.service'
import { BubblingHeart } from './BubblingHeart'
import { MediaPlayer } from './MediaPlayer'
import { useDispatch, useSelector } from 'react-redux'
export function AppFooter() {
  const [volume, setVolume] = useState(100)

  const handleVolumeChange = (event) => {
    setVolume(event.target.value)
  }
  const song = useSelector((storeState) => storeState.songModule.currSong)
  const station = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  return (
    <div className="app-footer">
      <div className="song-details">
        <div className="image">
          <img src={song ? song.imgUrl : station?.songs[0].imgUrl} />
        </div>
        <div className="actor-name-song">
          <p className="song-name">
            {song ? song.title : station?.songs[0].title}
          </p>
          <p className="actor-name">
            {song ? song.artist : station?.songs[0].artist}
          </p>
        </div>
        <div className="heart-picture-icons">
          <span
            className="picture-icon pointer"
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('pictureIcon'),
            }}
          ></span>{' '}
        </div>
      </div>
      <div className="media-player">
        <MediaPlayer volume={volume} onVolumeChange={handleVolumeChange} />
      </div>
      <div className="song-details-two">
        {' '}
        <span
          className="pointer"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('lyricsIcon'),
          }}
        ></span>{' '}
        <span
          className="pointer"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('queueIcon'),
          }}
        ></span>{' '}
        <span
          className="pointer"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('volumeIcon'),
          }}
        ></span>
        {/* <div className="progress-bar-audio"> */}
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="progress-bar-audio-fill"
        />
        {/* </div> */}
      </div>
    </div>
  )
}
