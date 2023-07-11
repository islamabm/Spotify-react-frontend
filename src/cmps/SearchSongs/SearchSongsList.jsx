import React from 'react'
import { SearchSongsPreview } from './SearchSongsPreview'

export function SearchSongsList({ list, stationId }) {
  return (
    <section className="search-song-list">
      {list?.map((song, idx) => (
        <SearchSongsPreview key={idx} song={song} stationId={stationId} />
      ))}
    </section>
  )
}
