import React from 'react'
import { getSpotifySvg } from '../../services/SVG.service'

export function SearchInput({
  isOpen,
  searchText,
  handleInputChange,
  closeSerach,
}) {
  return isOpen ? (
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
  )
}
