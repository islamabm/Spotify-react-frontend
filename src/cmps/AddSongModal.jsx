import React from 'react'
import { getSpotifySvg } from '../services/SVG.service'
import { UserStationName } from './UserStationName'
export function AddSongModal({ position }) {
  return (
    <section
      className="add-song-modal"
      style={{
        top: position.top - 160,
        left: position.left - 260,
      }}
    >
      <ul>
        <li className="filter-by-user-stations">
          <span
            dangerouslySetInnerHTML={{
              __html: getSpotifySvg('smallerSearchIcon'),
            }}
          ></span>
          <input type="text" placeholder="Find a playlist"></input>
        </li>
        <li className="create-station-from-add">
          <button>Create playlist</button>
        </li>
        <li>
          <UserStationName />
        </li>
      </ul>
    </section>
  )
}
