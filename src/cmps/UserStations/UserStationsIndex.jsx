import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserStationsList from './UserStationsList'
import { loadUserStations } from '../../store/actions/station.actions'

export function UserStationsIndex() {
  const userStations = useSelector(
    (storeState) => storeState.stationModule.userStations
  )
  console.log('userStations', userStations)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUserStations())
  }, [userStations])

  return (
    <section className="user-stations-index">
      <UserStationsList userStations={userStations} />
    </section>
  )
}
