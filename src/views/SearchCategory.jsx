import React from 'react'
import { useSelector } from 'react-redux'
import { StationPreview } from '../cmps/StationPreview'

export default function SearchCategory() {
  const stations = useSelector(
    (storeState) => storeState.stationModule.stations
  )
  const category = useSelector(
    (storeState) => storeState.stationModule.categoryBy
  )
  console.log('stations', stations)
  return (
    <section className="station-list-container">
      <h3 className="category-tag">{category}</h3>
      <section className="station-list">
        {stations
          ?.filter((station) => station.tags.includes(category))
          ?.map((station, idx) => (
            <StationPreview key={idx} station={station} />
          ))}
      </section>
    </section>
  )
}
