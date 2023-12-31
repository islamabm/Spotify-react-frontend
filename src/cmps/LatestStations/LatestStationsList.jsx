import React from 'react'
import LatestStationsPreview from './LatestStationsPreview'

export function LatestStationsList({ latestStations }) {
  return (
    latestStations && (
      <section className="latest-stations-container">
        {latestStations?.map((station, idx) => (
          <LatestStationsPreview key={station._id} station={station} />
        ))}
      </section>
    )
  )
}
