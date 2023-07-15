import React from 'react'
import { SearchSongsMobilePreview } from './SearchSongsMobilePreview'

export function SearchSongsMobileList({ list }) {
  return (
    <div>
      {list?.map((song, idx) => (
        <SearchSongsMobilePreview key={idx} song={song} />
      ))}
    </div>
  )
}
