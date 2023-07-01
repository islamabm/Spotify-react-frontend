import React, { useEffect, useState } from 'react'

import StationSystem from './StationSystem'
import StationUser from './StationUser.jsx'

export default function StationHeaderDetails({ bgStyle, station }) {
  const [createdBy, setCreatedBy] = useState('')
  useEffect(() => {
    setCreatedBy(station.createdBy?.fullname)
  }, [station])
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
