import React, { useState } from 'react'
import { getSpotifySvg } from '../../services/SVG.service'
import {
  UserStationName,
  UserStationNameIndex,
} from '../UserStationName/UserStationNameIndex'

export function AddSongModal({ position, addSongToStation, createStation }) {
  const [filterInput, setFilterInput] = useState('')

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
          <input
            type="text"
            placeholder="Find a playlist"
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
          ></input>
        </li>
        <li className="create-station-from-add">
          <button onClick={createStation}>Create playlist</button>
        </li>
        <li>
          <UserStationNameIndex
            addSongToStation={addSongToStation}
            filter={filterInput}
          />
        </li>
      </ul>
    </section>
  )
}
