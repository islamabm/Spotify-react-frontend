import React from 'react'
import { LatestStationsList } from './LatestStationsList'
import { useSelector } from 'react-redux'

export function LatestStationsIndex() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  if (!user || !user?.latestStations) return <div>What do you want to listen to today?</div>

  const latestStations = user?.latestStations

  return (
      <section className="latest-stations-index">
        <LatestStationsList latestStations={latestStations} />
      </section>
  )
}
