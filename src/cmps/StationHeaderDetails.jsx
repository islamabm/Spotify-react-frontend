import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import StationSystem from "./StationSystem"
import StationUser from "./StationUser.jsx"

export default function StationHeaderDetails({bgStyle,station}) {
  const [createdBy,setCreatedBy] = useState('')

  useEffect(() =>
  {
    setCreatedBy(station.createdBy?.fullname)
  }
  ,[station])
  
  console.log('station', station)
  console.log('createdBy', createdBy)
  return (
    <div className="station-header-content" style={bgStyle}>
      {station && (
        <>
          {createdBy === "system" && <StationSystem station={station} />}
          {createdBy === "guset" && <StationUser station={station} />}
        </>
      )}
    </div>
  )
}
