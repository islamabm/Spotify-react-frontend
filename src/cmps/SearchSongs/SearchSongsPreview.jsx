import React from "react"
import { useDispatch } from "react-redux"
import { addSongToStation } from "../../store/actions/station.actions"
import { utilService } from "../../services/util.service"
import { setVideoId } from "../../store/actions/song.actions"

export function SearchSongsPreview({ song, stationId }) {
  const dispatch = useDispatch()
  console.log("song", song)
  function playSong() {
    dispatch(setVideoId(song.videoId, song))
  }
  function handleAddSong() {
    song._id = utilService.makeId()
    dispatch(addSongToStation(stationId, song))
  }
  return (
    <article className="recommended-song flex align-center">
      <div className="img-and-title flex align-center" onClick={playSong}>
        <img src={song.imgUrl} className="song-img" />
        <div className="name-and-artist-container flex justify-center">
          <span className="song-name pointer">{song?.title}</span>
          <span className="song-artist">{song?.artist}</span>
        </div>
      </div>
      {stationId && (
        <button onClick={handleAddSong} className="pointer">
          Add
        </button>
      )}
    </article>
  )
}
