import React from 'react'
import { useDispatch } from 'react-redux'
import { addSongToStation } from '../../store/actions/station.actions'
import { utilService } from '../../services/util.service'

export function RecommendedPreview({ song, stationId }) {
  const dispatch = useDispatch()

  function handleAddSong() {
    song._id = utilService.makeId()
    dispatch(addSongToStation(stationId, song))
  }

  return (
    <article className="recommended-song flex align-center">
      <div className="img-and-title flex align-center">
        <img src={song?.imgUrl} className="song-img" />
        <span>{song?.title}</span>
      </div>
      <button onClick={handleAddSong} className="pointer">
        Add
      </button>
    </article>
  )
}
