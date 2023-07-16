import React from 'react'
import { useNavigate } from 'react-router-dom'
import { setVideoId, setCurrSongLyrics } from '../../store/actions/song.actions'
import { useDispatch } from 'react-redux'
export function SearchSongsMobilePreview({ song }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  function goToSongDetails() {
    dispatch(setVideoId(song.videoId, song))
    dispatch(setCurrSongLyrics(song.artist, song.title))
    navigate('/song/details')
  }

  let modifiedTitle = song?.title
  if (song?.title && song.title.includes('-') && song.title.includes('(')) {
    modifiedTitle = song.title.split('-')[1].split('(')[0].trim()
  }
  return (
    <div className="search-song-mobile-preview" onClick={goToSongDetails}>
      <div className="search-song-mobile-preview-image">
        <img src={song?.imgUrl} alt="song-image" />
      </div>
      <div className="search-song-mobile-preview-details">
        <p className="nice-p">{modifiedTitle}</p>
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
