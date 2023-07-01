import React, { useState, useEffect } from "react"
import { getSpotifySvg } from "../services/SVG.service"
import { stationService } from "../services/station.service"
import SearchSongsList from "./SearchSongsList"

export default function SearchSongs({ stationId }) {
  const [searchText, setSearchText] = useState("")
  const [songList, setSongList] = useState([])

  useEffect(() => {
    const timerId = setTimeout(async () => {
      const list = await stationService.getVideos(searchText)
      setSongList(list)
      console.log("songList", songList)
    }, 1000)
    return () => {
      clearTimeout(timerId)
      setSongList([])
    }
  }, [searchText])

  const handleInputChange = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <div className="search-songs-container">
      <h2>Let's find something for your playlist</h2>
      <button className="search-songs-x">
        <span
          className="search-icon"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg("x"),
          }}
        ></span>
      </button>
      <div className="input-container">
        <span
          className="search-icon"
          dangerouslySetInnerHTML={{
            __html: getSpotifySvg("searchIcon"),
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
      <div className="station-songs">
        {searchText.length > 0 &&
        <SearchSongsList list={songList} stationId={stationId} />
        }
      </div>
    </div>
  )
}
