import React, { useState } from 'react'
import { getSpotifySvg } from '../services/SVG.service'
import { UserStationName } from './UserStationName'
import { useDispatch, useSelector } from 'react-redux'
import { addStation } from '../store/actions/station.actions'
export function AddSongModal({ position, addSongToStation }) {
  const song = useSelector((storeState) => storeState.songModule.currSongAction)
  console.log('song', song)
  const dispatch = useDispatch()
  const [filterInput, setFilterInput] = useState('')
  function createStation() {
    const name = song?.title

    if (!song) {
      console.error('No song selected')
      return
    }

    dispatch(addStation(name, [song], song?.imgUrl))
  }

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
          <UserStationName
            addSongToStation={addSongToStation}
            filter={filterInput}
          />
        </li>
      </ul>
    </section>
  )
}
