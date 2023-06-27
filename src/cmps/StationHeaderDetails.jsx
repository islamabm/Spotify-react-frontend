import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import StationSystem from './StationSystem'
import StationUser from './StationUser.jsx'

export default function StationHeaderDetails({ bgStyle, station }) {
  const storeStation = useSelector(
    (storeState) => storeState.stationModule.currStation
  )
  const [createdBy, setCreatedBy] = useState('')
  useEffect(() => {
    setCreatedBy(station.createdBy?.fullname)
  }, [station])
  console.log('station in StationHeaderDetails', station)
  console.log('storeStation in StationHeaderDetails store', storeStation)
  return (
    <div className="station-header-content" style={bgStyle}>
      {station && (
        <>
          {createdBy === 'system' && <StationSystem station={station} />}
          {createdBy === 'guest' && <StationUser station={station} />}
        </>
      )}
    </div>
  )
}
