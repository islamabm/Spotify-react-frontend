import React, { useEffect } from 'react'
import { StationList } from '../cmps/StationList'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserStations } from '../store/actions/station.actions'
import { UserLibraryList } from '../cmps/UserLibraryStations/UserLibraryList'
export function UserLibraryIndex() {
  const dispatch = useDispatch()
  const stations = useSelector(
    (storeState) => storeState.stationModule.userStations
  )
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  useEffect(() => {
    dispatch(loadUserStations())
  }, [user])

  if (!stations) return <div className="loader"></div>

  return (
    <section className="station-index">
      <UserLibraryList stations={stations} />
    </section>
  )
}
