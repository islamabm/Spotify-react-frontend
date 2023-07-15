import React from 'react'

export function SearchSongsMobilePreview({ song }) {
  console.log('song', song)
  return (
    <div className="search-song-mobile-preview">
      <div className="search-song-mobile-preview-image">
        <img src={song?.imgUrl} alt="song-image" />
      </div>
      <div className="search-song-mobile-preview-details">
        <p className="nice-p">{song?.title}</p>
        <div>
          <p>Song</p>
          <p className="dot">•</p>
          <p>{song?.artist} |</p>
          <p>{song?.album}</p>
        </div>
      </div>
    </div>
  )
}
