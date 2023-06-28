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
  return (
    <div className="station-header-content" style={bgStyle}>
      {station && (
        <>
          {createdBy === 'system' && <StationSystem station={station} />}
          {console.log('hi between the render option')}
          {createdBy === 'guest' && <StationUser station={station} />}
          {console.log('hi after the render option')}
        </>
      )}
    </div>
  )
}
