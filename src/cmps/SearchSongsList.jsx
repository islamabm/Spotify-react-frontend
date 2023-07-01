import React from 'react'
import SearchStationPreview from './SearchStationPreview'

export default function SearchSongsList({list , stationId}) {
    console.log('list', list)
  return (
    <section className="recommended-list-container">
    {list?.map((song,idx) => (
      <SearchStationPreview key={idx} song={song} stationId={stationId} />
    ))}
  </section>
  )
}
