import React from 'react'

export default function UserStationsNamePreview({ station, addSongToStation }) {
  return (
    <li onClick={() => addSongToStation(station._id)}>
      <button>{station.name}</button>
    </li>
  )
}
