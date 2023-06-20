import React from 'react'

import { BubblingHeart } from './BubblingHeart'
import { MediaPlayer } from './MediaPlayer'
export function AppFooter() {
  return (
    <div className="app-footer">
      <div className="song-details">
        <div className="image">
          <img src="https://imgd.aeplcdn.com/1056x594/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=75" />
        </div>
        <div className="actor-name-song">
          <p className="song-name">unicornn</p>
          <p className="actor-name">Noa kirel</p>
        </div>
        <div>
          <BubblingHeart />
        </div>
      </div>
      <div className="media-player">
        <MediaPlayer />
      </div>
      <div className="song-details-two">
        <p>section three</p>
      </div>
    </div>
  )
}
