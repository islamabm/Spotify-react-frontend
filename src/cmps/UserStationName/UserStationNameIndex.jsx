import React from 'react'
import { useSelector } from 'react-redux'
import UserStationsNameList from './UserStationsNameList'

export function UserStationNameIndex({ addSongToStation, filter }) {
  const userStations = useSelector(
    (storeState) => storeState.stationModule.userStations
  )

  return (
    <div className="user-stations-name">
      <UserStationsNameList
        userStations={userStations}
        addSongToStation={addSongToStation}
        filter={filter}
      />
    </div>
  )
}
