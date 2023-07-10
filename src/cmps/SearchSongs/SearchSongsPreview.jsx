import React from 'react'
import { useDispatch } from 'react-redux'
import { addSongToStation } from '../../store/actions/station.actions'
import { utilService } from '../../services/util.service'
import { setCurrSong } from '../../store/actions/song.actions'

export function SearchSongsPreview({ song, stationId }) {
  const dispatch = useDispatch()

  function playSong () {
    console.log('song', song)
    dispatch(setCurrSong('' , song.videoId ))
  }
  function handleAddSong() {
    song._id = utilService.makeId()
    dispatch(addSongToStation(stationId, song))
  }
  return (
    <article className="recommended-song flex align-center">
      <div className="img-and-title flex align-center" onClick={playSong}>
        <img src={song.imgUrl} className="song-img" />
        <span>{song?.title}</span>
      </div>
      {stationId &&
      <button onClick={handleAddSong} className="pointer">
        Add
      </button>
      }
    </article>
  )
}
