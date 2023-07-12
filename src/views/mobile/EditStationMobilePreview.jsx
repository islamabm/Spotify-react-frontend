import React from 'react'
import { getSpotifySvg } from '../../services/SVG.service'
import { useDispatch } from 'react-redux'
import { removeSongFromStation } from '../../store/actions/station.actions'
export function EditStationMobilePreview({ provided, song, station }) {
  const dispatch = useDispatch()

  function remove() {
    dispatch(removeSongFromStation(station._id, song._id))
  }

  return (
    <div className="edit-station-mobile-preview">
      <div className="preview-img-container">
        <span
          onClick={remove}
          title="Go back"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('deleteMobile'),
          }}
        ></span>
        <div className="name-and-artist">
          <p className="edit-station-mobile-preview-song-name">{song?.title}</p>
          <p className="edit-station-mobile-preview-song-name">
            {song?.artist}
          </p>
        </div>
      </div>
      <span
        {...provided.dragHandleProps}
        title="Go back"
        dangerouslySetInnerHTML={{
          __html: getSpotifySvg('menu'),
        }}
      ></span>
    </div>
  )
}
