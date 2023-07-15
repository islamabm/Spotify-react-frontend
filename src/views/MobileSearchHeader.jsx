import React, { useEffect, useState } from 'react'
import { stationService } from '../services/station.service'
import { getSpotifySvg } from '../services/SVG.service'
export function MobileSearchHeader() {
  const [searchText, setSearchText] = useState('')
  const [songList, setSongList] = useState([])

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
  return (
    <div className="mobile-search-songs-header">
      <button className="user-details-arrow">
        <span
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('leftArrow'),
          }}
        ></span>
      </button>
      <div className="input-search-container flex">
        <span
          title="Pause"
          className="pause-button flex align-center justify-center title lyrics-play"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg('searchIcon'),
          }}
        ></span>
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={searchText}
          //   onClick={goToMobileSearchPage}
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}
