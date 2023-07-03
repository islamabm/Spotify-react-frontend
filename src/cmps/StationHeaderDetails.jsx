import React, { useEffect, useState } from 'react'

import StationSystem from './StationSystem'
import StationUser from './StationUser.jsx'
import StationLikedSongs from './StationLikedSongs.jsx'
import { useSelector } from 'react-redux'

export default function StationHeaderDetails({ bgStyle, station }) {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const [createdBy, setCreatedBy] = useState('')

  useEffect(() => {
    setCreatedBy(station.createdBy?.fullname)
  }, [station])
  return (
    <div className="station-header-content" style={bgStyle}>
      {station && (
        <>
          {createdBy === 'system' && <StationSystem station={station} />}

          {createdBy === user?.username && <StationUser station={station} />}
          {createdBy === 'Liked songs system' && (
            <StationLikedSongs station={station} />
          )}
        </>
      )}
    </div>
  )
}
