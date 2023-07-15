import React, { useEffect, useState } from 'react'
import { stationService } from '../services/station.service'
import { getSpotifySvg } from '../services/SVG.service'
import { useDispatch } from 'react-redux'
import { setSearchStations } from '../store/actions/station.actions'
export function MobileSearchHeader() {
  const [searchText, setSearchText] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    if (!searchText) {
      dispatch(setSearchStations(null))
      return
    }
    const timerId = setTimeout(async () => {
      const list = await stationService.getVideos(searchText)
      dispatch(setSearchStations(list))
    }, 1000)
    return () => {
      clearTimeout(timerId)
      dispatch(setSearchStations(null))
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
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}
