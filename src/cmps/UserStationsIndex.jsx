import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserStationsList from './UserStationsList'

export function UserStationsIndex() {
  const userStations = useSelector(
    (storeState) => storeState.stationModule.userStations
  )
  console.log('userStations', userStations)

  return (
    <section className="user-stations-index">
      <UserStationsList userStations={userStations} />
    </section>
  )
}
