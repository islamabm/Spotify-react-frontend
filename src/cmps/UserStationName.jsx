import React from 'react'
import { useSelector } from 'react-redux'

export function UserStationName() {
  const userStations = useSelector(
    (storeState) => storeState.stationModule.userStations
  )

  return (
    <div className="user-stations-name">
      <ul>
        {userStations.map((station, idx) => (
          <li key={idx}>
            <button>{station.name}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
