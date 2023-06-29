import React from 'react'
import UserStationsNamePreview from './UserStationsNamePreview'

export default function UserStationsNameList({
  userStations,
  addSongToStation = { addSongToStation },
  filter = { filter },
}) {
  return (
    <ul>
      {userStations
        ?.filter((station) => station.name.includes(filter))
        .map((station, idx) => (
          <UserStationsNamePreview
            station={station}
            addSongToStation={addSongToStation}
            filter={filter}
            key={idx}
          />
        ))}
    </ul>
  )
}
