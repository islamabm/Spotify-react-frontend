import React, { useState, useEffect } from 'react'
import { getSpotifySvg } from '../../services/SVG.service'
import { stationService } from '../../services/station.service'
import SearchSongsList from './SearchSongsList'

export function SearchSongsIndex({ stationId }) {
  const [searchText, setSearchText] = useState('')
  const [songList, setSongList] = useState([])
  const [isOpen, setIsOpen] = useState(true)
  useEffect(() => {
    const timerId = setTimeout(async () => {
      const list = await stationService.getVideos(searchText)
      setSongList(list)
    }, 1000)
    return () => {
      clearTimeout(timerId)
      setSongList([])
    }
  }, [searchText])

  function handleInputChange(e) {
    setSearchText(e.target.value)
  }

  function closeSerach() {
    setIsOpen(false)
  }

  return (
    <div className="search-songs-container">
      {isOpen ? (
        <>
          <h2>Let's find something for your playlist</h2>
          <button className="search-songs-x pointer" onClick={closeSerach}>
            <span
              className="search-icon pointer"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('x'),
              }}
            ></span>
          </button>
          <div className="input-container">
            <span
              className="search-icon"
              dangerouslySetInnerHTML={{
                __html: getSpotifySvg('searchIcon'),
              }}
            ></span>
            <input
              type="text"
              className="search-input"
              placeholder="Search for songs"
              value={searchText}
              onChange={handleInputChange}
            />
          </div>
        </>
      ) : (
        <h1>shlock</h1>
      )}
      <div className="station-songs search">
        {searchText.length > 0 && (
          <SearchSongsList list={songList} stationId={stationId} />
        )}
      </div>
    </div>
  )
}
