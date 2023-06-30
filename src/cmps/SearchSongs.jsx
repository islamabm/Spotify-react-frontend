import React from 'react'

export default function SearchSongs() {
  return (
    <div className='search-songs-container'>
        <h2>Let's find something for your playlist</h2>
        <span>X</span>
        <div className="input-container">
        <input type="text" className='search-input' placeholder='Search for songs'/>
        </div>
    </div>
  )
}
