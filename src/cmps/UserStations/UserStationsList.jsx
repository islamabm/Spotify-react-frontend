import React from 'react'
import UserStationsPreview from './UserStationsPreview'
import LikedSongsStation from './LikedSongsStation'

export default function UserStationsList({ userStations }) {
  return (
    <section className="user-station-list">
      <LikedSongsStation />
      {userStations?.map((station) => (
        <UserStationsPreview key={station._id} station={station} />
      ))}
    </section>
  )
}
