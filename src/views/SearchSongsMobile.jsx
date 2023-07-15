import React from 'react'
import { useSelector } from 'react-redux'
import { SearchSongsMobileList } from '../cmps/SearchSongsMobile/SearchSongsMobileList'
export function SearchSongsMobile() {
  const list = useSelector((storeState) => storeState.stationModule.searchList)
  if (!list)
    return (
      <div className="no-search-songs">
        <h1>Play what you love</h1>
        <p>search for songs...</p>
      </div>
    )
  return (
    <section className="search-song-list">
      <SearchSongsMobileList list={list} />
    </section>
  )
}
