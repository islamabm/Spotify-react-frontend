import React from 'react'
import { useSelector } from 'react-redux'

export function UserStationName({ addSongToStation, filter }) {
  const userStations = useSelector(
    (storeState) => storeState.stationModule.userStations
  )

  return (
    <div className="user-stations-name">
      <ul>
        {userStations
          ?.filter((station) => station.name.includes(filter))
          .map((station, idx) => (
            <li key={idx} onClick={() => addSongToStation(station._id)}>
              <button>{station.name}</button>
            </li>
          ))}
      </ul>
    </div>
  )
}
