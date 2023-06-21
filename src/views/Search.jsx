import React, { useEffect, useState } from "react"
import { stationService } from "../services/station.service"

export default function Search() {
  const [searchStations, setSearchStations] = useState(null)

  function loadSearchCategories() {
    const categories = stationService.loadSearchStations()
    setSearchStations(categories)
  }

  useEffect(() => loadSearchCategories(), [])
  console.log('searchStations', searchStations)
  if (!searchStations) return <div>Loading....</div>
  return (
      <div>
        {searchStations.map((category,idx) => {
            return (
          <div key={idx}>
            <img src={category.img} alt="category search img" />
            <div>{category.title}</div>
          </div>
        )})}
      </div>
  )
}
