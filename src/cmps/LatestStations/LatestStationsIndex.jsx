import React from 'react'
import { LatestStationsList } from './LatestStationsList'
import { useSelector } from 'react-redux'

export function LatestStationsIndex() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  if (!user || !user.latestStations) return <div>There are no latest stations.</div>

  const latestStations = user.latestStations

  return (
    latestStations && (
      <section className="latest-stations-index">
        <LatestStationsList latestStations={latestStations} />
      </section>
    )
  )
}
