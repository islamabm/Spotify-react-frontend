import React from 'react'
import UserStationsPreview from './UserStationsPreview'
import LikedSongsStation from './LikedSongsStation'

export default function UserStationsList({ userStations , filterUserStations }) {

  return (
    <section className="user-station-list">
      <LikedSongsStation />
      {userStations?.filter((station) => station?.name?.includes(filterUserStations)).map((station) => (
        <UserStationsPreview key={station?._id} station={station} />
      ))}
    </section>
  )
}
