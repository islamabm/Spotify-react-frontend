import React, { useState } from 'react'
import { getSpotifySvg } from '../../services/SVG.service'
import { UserStationNameIndex } from '../UserStationName/UserStationNameIndex'
import { useSelector } from 'react-redux'

export function AddSongModal({ position, addSongToStation, createStation }) {
  const [filterInput, setFilterInput] = useState('')
  const direction = useSelector(
    (storeState) => storeState.songModule.currDirection
  )

  return (
    <section
      className="add-song-modal"
      style={{
        top: direction === 'left' ? position.top - 160 : position.top - 200,
        left: direction === 'left' ? position.left - 260 : position.left + 180,
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
