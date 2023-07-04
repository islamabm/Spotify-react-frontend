import { memo, useEffect, useState } from "react"
import { StationPreview } from "./StationPreview"

function _StationList({ stations }) {
  const [stationsCategory, setStationsCategory] = useState([])

  function categorizedStations() {
    const category = stations?.reduce((acc, station) => {
      station.tags.forEach((tag) => {
        if (!acc[tag]) {
          acc[tag] = []
        }
        acc[tag].push(station)
      })
      return acc
    }, {})
    return Object.entries(category) // Convert the object into an array of key-value
  }

  useEffect(() => {
    setStationsCategory(categorizedStations())
  }, [])

  return (
      <section className="station-list-container">
        {stationsCategory.map(([tag, stationTag]) => (
          <>
            <h3 className="category-tag">{tag}</h3>
            <section className="station-list">
              {stationTag.map((station) => (
                <StationPreview key={station._id} station={station} />
              ))}
            </section>
          </>
        ))}
      </section>
  )
}

export const StationList = memo(_StationList)
