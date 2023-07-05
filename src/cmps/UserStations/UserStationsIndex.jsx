import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserStationsList from './UserStationsList'
import { loadUserStations } from '../../store/actions/station.actions'

export function UserStationsIndex({ filterUserStations }) {
  const userStations = useSelector(
    (storeState) => storeState.stationModule.userStations
  )

  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('loadstations')
    dispatch(loadUserStations())
  }, [userStations, user])

  return (
    <section className="user-stations-index">
      <UserStationsList
        userStations={userStations}
        filterUserStations={filterUserStations}
      />
    </section>
  )
}
