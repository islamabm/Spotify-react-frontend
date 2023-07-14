import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserStations } from '../store/actions/station.actions'
import { UserLibraryList } from '../cmps/UserLibraryStations/UserLibraryList'

export function UserLibraryIndex() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.userStations
  )
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUserStations())
  }, [user])

  if (!stations) return <div className="loader"></div>

  return (
    <section className="user-details-index">
      <UserLibraryList stations={stations} title="Your Playlists" />
    </section>
  )
}
