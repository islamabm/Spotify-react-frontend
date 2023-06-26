import React from 'react'
import UserStationsPreview from './UserStationsPreview'

export default function UserStationsList({ userStations }) {
  console.log('userStations in the list', userStations)
  return (
    <section className="user-station-list">
      {userStations?.map((station) => (
        <UserStationsPreview key={station._id} station={station} />
      ))}
    </section>
  )
}
