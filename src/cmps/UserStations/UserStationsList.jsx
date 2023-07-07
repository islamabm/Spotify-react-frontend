import React from 'react'
import UserStationsPreview from './UserStationsPreview'
import LikedSongsStation from './LikedSongsStation'
import { useSelector } from 'react-redux'

export default function UserStationsList({ userStations, filterUserStations }) {
  const song = useSelector((storeState) => storeState.songModule.currSong)
  // const currentPlaylist = useSelector(
  //   (storeState) => storeState.stationModule.currStation
  // )

  return (
    <section className="user-station-list">
      <LikedSongsStation />
      {userStations
        ?.filter((station) => station?.name?.includes(filterUserStations))
        .map((station) => {
          let color = station.songs.some((s) => s._id === song?._id)
            ? 'green'
            : ''
          return (
            <UserStationsPreview
              key={station?._id}
              station={station}
              color={color}
            />
          )
        })}
    </section>
  )
}
