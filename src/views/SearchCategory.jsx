import React from 'react'
import { useSelector } from 'react-redux'
import { StationPreview } from '../cmps/StationPreview'

export default function SearchCategory() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  console.log('stations', stations)
  return (
    <section className="station-list-container">
      <h3 className="category-tag">{stations[0].tags}</h3>
      <section className="station-list">
        {stations.map((station, idx) => (
          <StationPreview key={idx} station={station} />
        ))}
      </section>
    </section>
  )
}
