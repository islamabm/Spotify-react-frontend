import React from 'react'
import SearchSongsPreview from './SearchSongsPreview'

export default function SearchSongsList({ list, stationId }) {
  return (
    <section className="recommended-list-container">
      {list?.map((song, idx) => (
        <SearchSongsPreview key={idx} song={song} stationId={stationId} />
      ))}
    </section>
  )
}
