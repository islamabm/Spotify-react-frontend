import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function UserStations() {
  const userStations = useSelector(
    (storeState) => storeState.stationModule.userStations
  )
  console.log('userStations', userStations)

  return (
    <div>
      <h1>User Stations:</h1>
      {userStations?.map((station, idx) => (
        <p key={idx}>{station.name}</p>
      ))}
    </div>
  )
}
